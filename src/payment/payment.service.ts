import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { NotificationService } from 'src/notification/notification.service';
import { Limit } from 'src/common/utils/app';
import { Payment } from '@prisma/client';

export const POINT_RATE = 10; // ₦10 = 1 point

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  async create(dto: CreatePaymentDto, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const reference = `ref_${Date.now()}_${dto.userId}`;

    // Save to DB first (status = pending)
    const payment = await this.prisma.payment.create({
      data: {
        amount: dto.amount,
        currency: dto.currency || 'NGN',
        status: 'pending',
        method: dto.method,
        reference,
        description: dto.description,
        updatedAt: new Date(),
        User: { connect: { id: dto.userId } },
      },
    });

    if (dto.method === 'flutterwave') {
      // Call Flutterwave API
      try {
        const url = 'https://api.flutterwave.com/v3/payments';

        const response = await axios.post(
          url,
          {
            tx_ref: reference,
            amount: dto.amount,
            currency: dto.currency ?? 'NGN',
            redirect_url: process.env.FLUTTERWAVE_CALLBACK_URL,
            customer: {
              email: user.email,
            },
            customizations: {
              title: 'Wallet Funding',
              description: 'Fund wallet balance',
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.data.status !== 'success') {
          throw new Error(response.data.message);
        }

        return {
          authorizationUrl: response.data.data.link, // ✅ correct
          reference,
          payment,
          data: response.data,
        };
      } catch (err: any) {
        throw new HttpException(
          `Flutterwave initialization failed: ${
            err.response?.data?.message || err.message
          }`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Call Paystack API
    try {
      const url = 'https://api.paystack.co/transaction/initialize';
      const response = await axios.post(
        url,
        {
          email: user?.email, // user email required by Paystack
          amount: dto.amount * 100, // Paystack expects amount in kobo
          reference,
          callback_url: process.env.PAYSTACK_CALLBACK_URL,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.data || response.data.status !== true) {
        throw new Error(
          response.data?.message || 'Paystack initialization failed',
        );
      }

      return {
        authorizationUrl: response.data?.data?.authorization_url,
        reference,
        payment,
      };
    } catch (err) {
      throw new HttpException(
        `Paystack initialization failed: ${err.message} || ${err.response?.data?.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyPayment(reference: string) {
    // c2fde19b11ba825ebeff
    // 9912765
    const payment = await this.prisma.payment.findUnique({
      where: { reference },
    });

    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    if (payment.status === 'success') {
      return payment; // ✅ idempotent
    }

    if (payment.method === 'paystack') {
      return this.verifyPaystack(payment);
    }

    if (payment.method === 'flutterwave') {
      return this.verifyFlutterwave(payment);
    }

    throw new HttpException(
      'Unsupported payment provider',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Find all payments
  async findAll(page = 1, limit = Limit) {
    try {
      const skip = (page - 1) * limit;
      const [payments, total] = await Promise.all([
        this.prisma.payment.findMany({
          skip,
          take: limit,
          include: { User: true }, // optional: join user info
          orderBy: { id: 'desc' },
        }),
        this.prisma.payment.count(),
      ]);
      return {
        data: payments,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.log('Error fetching payments:', error);
      throw error;
    }
  }

  async findMyPayments(userId: number, page = 1, limit = Limit) {
    try {
      const skip = (page - 1) * limit;

      const [payments, total] = await Promise.all([
        this.prisma.payment.findMany({
          where: { userId },
          skip,
          take: limit,
          include: { User: true }, // optional: bring user info
          orderBy: { id: 'desc' },
        }),
        this.prisma.payment.count({
          where: { userId },
        }),
      ]);

      return {
        data: payments,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.log('Error fetching user payments:', error);
      throw error;
    }
  }

  // Find one by ID
  async findOne(id: number) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: { User: true },
    });
  }

  // Update payment
  async update(id: number, data: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data,
    });
  }

  // Delete payment
  async remove(id: number) {
    return this.prisma.payment.delete({
      where: { id },
    });
  }

  async convertWalletToPoints(userId: number, points: number) {
    const cost = points * POINT_RATE;

    return this.prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({
        where: { userId },
      });

      if (!wallet || wallet.balance < cost) {
        throw new HttpException(
          'Insufficient wallet balance',
          HttpStatus.BAD_REQUEST,
        );
      }

      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: cost },
          points: { increment: points },
        },
      });

      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'points_purchase',
          amount: cost,
          points,
          description: `Purchased ${points} points`,
        },
      });

      return { balanceSpent: cost, pointsAdded: points };
    });
  }

  async convertPointsToWallet(userId: number, points: number) {
    const value = points * POINT_RATE;

    return this.prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({
        where: { userId },
      });

      if (!wallet) {
        throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
      }

      if (wallet.points < points) {
        throw new HttpException(
          'Insufficient points balance',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Update wallet
      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          points: { decrement: points },
          balance: { increment: value },
        },
      });

      // Log transaction
      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'points_redeem',
          amount: value,
          points,
          description: `Converted ${points} points to ₦${value}`,
        },
      });

      return {
        pointsSpent: points,
        balanceAdded: value,
      };
    });
  }

  async getWallet(id: number) {
    try {
      const res = await this.prisma.wallet.findUnique({
        where: { id },
        include: {
          transactions: {
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
        },
      });
      return { message: 'Success', data: res };
    } catch (error) {
      console.log('error', error);
    }
  }

  async getBankList() {
    try {
      const response = await axios.get(`https://api.paystack.co/bank/`, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      const data = response.data;

      if (data.status !== 'success') {
        throw new HttpException(
          'bank list not retrieved successfully',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  private async verifyPaystack(payment: Payment) {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${payment.reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = response.data.data || response.data;

    if (data.status !== 'success') {
      throw new HttpException('Payment not successful', HttpStatus.BAD_REQUEST);
    }

    return this.creditWallet({
      payment,
      paidAt: new Date(data.paid_at),
      method: data.channel,
      description: 'Wallet funded via Paystack',
    });
  }

  private async verifyFlutterwave(payment: Payment) {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${payment.reference}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      },
    );

    const data = response.data.data || response.data;

    if (data.status !== 'successful') {
      throw new HttpException('Payment not successful', HttpStatus.BAD_REQUEST);
    }

    return this.creditWallet({
      payment,
      paidAt: new Date(data.created_at),
      method: data.payment_type,
      description: 'Wallet funded via Flutterwave',
    });
  }

  private async creditWallet({
    payment,
    paidAt,
    method,
    description,
  }: {
    payment: Payment;
    paidAt: Date;
    method: string;
    description: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: 'success',
          paidAt,
          method,
          updatedAt: new Date(),
        },
      });

      const wallet =
        (await tx.wallet.findUnique({
          where: { userId: payment.userId },
        })) ||
        (await tx.wallet.create({
          data: { userId: payment.userId },
        }));

      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { increment: payment.amount },
        },
      });

      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'credit',
          amount: payment.amount,
          reference: payment.reference,
          description,
        },
      });

      await this.notificationService.create({
        userId: payment.userId,
        title: 'Payment Successful',
        message: `Your wallet has been credited with ₦${payment.amount}`,
        type: 'payment',
      });

      return updatedPayment;
    });
  }
}
