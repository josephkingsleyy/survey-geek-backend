import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { NotificationService } from 'src/notification/notification.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WithdrawalService {

  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) { }

  async create(userId: number, createWithdrawalDto: CreateWithdrawalDto) {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { userId },
      });

      if (!wallet || wallet.balance < createWithdrawalDto.amount) {
        throw new HttpException(
          'Insufficient wallet balance',
          HttpStatus.BAD_REQUEST,
        );
      }

      const withdrawal = await this.prisma.withdrawal.create({
        data: {
          userId,
          amount: createWithdrawalDto.amount,
          bankName: createWithdrawalDto.bankName,
          accountNumber: createWithdrawalDto.accountNumber,
          accountName: createWithdrawalDto.accountName,
          status: 'pending',
        },
      });

      // Deduct from wallet
      await this.prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: createWithdrawalDto.amount },
        },
      });

      return withdrawal;
    } catch (error) {
      throw new HttpException(
        'Withdrawal request failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all withrawal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} withrawal`;
  }

  update(id: number, updateWithdrawalDto: UpdateWithdrawalDto) {
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
