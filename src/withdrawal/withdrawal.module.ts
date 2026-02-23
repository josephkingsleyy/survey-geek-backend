import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  controllers: [WithdrawalController],
  providers: [WithdrawalService],
  imports: [PrismaModule, NotificationModule],
})
export class WithdrawalModule {}
