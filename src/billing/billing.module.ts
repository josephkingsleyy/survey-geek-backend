import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  controllers: [BillingController],
  providers: [BillingService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
  imports: [PrismaModule],
})
export class BillingModule {}
