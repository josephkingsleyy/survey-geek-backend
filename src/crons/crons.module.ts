import { Module } from '@nestjs/common';
import { CronsService } from './crons.service';
import { CronsController } from './crons.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GeneralCronService } from './general-cron.service';
import { PaymentCronService } from './payment-cron.service';
import { BillingCronService } from './billing-cron.service';
import { SurveyCronService } from './survey-cron.service';

@Module({
  controllers: [CronsController],
  providers: [
    CronsService,
    GeneralCronService,
    PaymentCronService,
    BillingCronService,
    SurveyCronService,
  ],
  imports: [ScheduleModule.forRoot(), PrismaModule],
})
export class CronsModule { }
