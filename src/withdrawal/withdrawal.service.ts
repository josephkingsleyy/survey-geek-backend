import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import axios from 'axios';
import { NotificationService } from 'src/notification/notification.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WithdrawalService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) { }

  async create(userId: number, createWithdrawalDto: CreateWithdrawalDto) {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { userId },
      });

      const amountRequested = Number(createWithdrawalDto.amount);
      const FIXED_FEE = Number(process.env.WITHDRAWAL_FIXED_FEE ?? 50);
      const PERCENT_FEE = Number(process.env.WITHDRAWAL_FEE_PERCENT ?? 1.5);

      const percentPortion = Math.ceil((amountRequested * PERCENT_FEE) / 100);
      const fee = FIXED_FEE + percentPortion;
      const transferAmount = amountRequested - fee;

      if (!Number.isFinite(amountRequested) || amountRequested <= 0) {
        throw new HttpException('Invalid withdrawal amount', HttpStatus.BAD_REQUEST);
      }

      if (transferAmount <= 0) {
        throw new HttpException(
          'Amount too small after fees. Increase withdrawal amount.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!wallet || wallet.balance < amountRequested) {
        throw new HttpException(
          'Insufficient wallet balance',
          HttpStatus.BAD_REQUEST,
        );
      }

      const resolvedBankCode = createWithdrawalDto.bankCode || createWithdrawalDto.bankName;
      if (!resolvedBankCode) {
        throw new HttpException(
          'Bank code or bank name is required for withdrawal',
          HttpStatus.BAD_REQUEST,
        );
      }

      const withdrawal = await this.prisma.withdrawal.create({
        data: {
          userId,
          amount: amountRequested,
          bankName: createWithdrawalDto.bankName || 'Unknown Bank',
          accountNumber: createWithdrawalDto.accountNumber,
          accountName: createWithdrawalDto.accountName,
          status: 'pending',
        },
      });

      // Deduct full requested amount from wallet (client bears fee)
      await this.prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: amountRequested },
        },
      });

      // Log wallet transaction
      await this.prisma.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'withdrawal',
          amount: amountRequested,
          description: `Withdrawal request: transfer ₦${transferAmount} after fee ₦${fee}`,
          reference: `wd_${withdrawal.id}_${Date.now()}`,
        },
      });

      // Try to create Paystack transfer recipient and initiate transfer
      try {
        let bankCode = createWithdrawalDto.bankCode;

        if (!bankCode) {
          const banksRes = await axios.get('https://api.paystack.co/bank', {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
          });

          const banks = banksRes.data?.data || [];
          const bank = banks.find((b: any) =>
            String(b.name).toLowerCase().includes(String(createWithdrawalDto.bankName || '').toLowerCase()),
          );

          if (!bank) {
            throw new Error('Destination bank not found via Paystack');
          }

          bankCode = bank.code;
        }

        const recipientRes = await axios.post(
          'https://api.paystack.co/transferrecipient',
          {
            type: 'nuban',
            name: createWithdrawalDto.accountName,
            account_number: createWithdrawalDto.accountNumber,
            bank_code: bankCode,
            currency: 'NGN',
          },
          { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } },
        );

        const recipient = recipientRes.data?.data;

        if (!recipient || !recipient.recipient_code) {
          throw new Error('Failed to create transfer recipient');
        }

        // Initiate transfer (amount in kobo)
        const transferRes = await axios.post(
          'https://api.paystack.co/transfer',
          {
            source: 'balance',
            amount: transferAmount * 100,
            recipient: recipient.recipient_code,
            reason: `Withdrawal ${withdrawal.id}`,
          },
          { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } },
        );

        const transferData = transferRes.data?.data;

        // Update withdrawal status to processing and return provider details
        await this.prisma.withdrawal.update({
          where: { id: withdrawal.id },
          data: { status: 'approved' },
        });

        // Notify user
        this.notificationService.create({
          userId,
          title: 'Withdrawal initiated',
          message: `Your withdrawal of ₦${amountRequested} has been initiated. Fee: ₦${fee}. You will receive ₦${transferAmount}.`,
          type: 'withdrawal',
        }).catch(() => { });

        return { withdrawal, transfer: transferData, fee, transferAmount };
      } catch (err: any) {
        // If transfer initiation failed, mark withdrawal as declined and refund user
        await this.prisma.withdrawal.update({
          where: { id: withdrawal.id },
          data: { status: 'declined', declinedBy: null },
        });

        // Refund wallet
        await this.prisma.wallet.update({
          where: { id: wallet.id },
          data: { balance: { increment: amountRequested } },
        });

        throw new HttpException(
          `Withdrawal failed: ${err.response?.data?.message || err.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error:any) {
      throw new HttpException(
        error.message || 'Withdrawal request failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all withrawal`;
  }

  async getBanks() {
    try {
      const secretKey = process.env.PAYSTACK_SECRET_KEY;

      console.log('Key exists:', !!secretKey);
      console.log('Key type:', secretKey?.substring(0, 8));
      const response = await axios.get(
        'https://api.paystack.co/bank',
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Paystack banks response:', response.data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Paystack Error Status:', error.response?.status);
        console.error('Paystack Error Data:', error.response?.data);
        console.error('Paystack Error Message:', error.message);
      } else {
        console.error('Unknown error:', error);
      }

      throw new HttpException(
        'Unable to fetch banks from Paystack',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} withrawal`;
  }

  update(id: number,) {
    return `This action updates a #${id} withrawal`;
  }

  remove(id: number) {
    return `This action removes a #${id} withrawal`;
  }

  async approveWithdrawal(withdrawalId: number, approverId: number) {
    return await this.prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: 'approved',
        approvedBy: approverId,
      },
    });
  }

  async declineWithdrawal(withdrawalId: number, declinerId: number) {
    return await this.prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: 'declined',
        declinedBy: declinerId,
      },
    });
  }
}
