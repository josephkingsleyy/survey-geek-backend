import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { NotificationService } from 'src/notification/notification.service';
import { Limit } from 'src/common/utils/app';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) { }

  async create(dto: CreatePaymentDto, userId: number) {
    // Generate reference
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });
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

    // Call Paystack API
    const url = 'https://api.paystack.co/transaction/initialize';
    try {
      const response = await axios.post<{
        data: { authorization_url: string };
      }>(
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

      return {
        authorizationUrl: response.data?.data?.authorization_url,
        reference,
        payment,
      };
    } catch (err) {
      throw new HttpException(
        'Paystack initialization failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyPayment(reference: string) {
    
    const url = `https://api.paystack.co/transaction/verify/${reference}`;

    try {
      const response: any = await axios.get(url, {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      });

      const data = response.data.data;

      // Update DB
      const payment = await this.prisma.payment.update({
        where: { reference },
        data: {
          status: data.status === 'success' ? 'success' : 'failed',
          paidAt: data.paid_at ? new Date(data.paid_at) : null,
          method: data.channel,
          updatedAt: new Date(),
        },
        include: { User: true },
      });

      await this.notificationService.create({
        userId: payment.userId,
        title: 'Payment Successful',
        message: `Your payment of ${payment.amount} ${payment.currency} was successful.`,
        type: 'payment',
      });

      return payment;
    } catch (err) {
      throw new HttpException(
        'Paystack verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
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


}
