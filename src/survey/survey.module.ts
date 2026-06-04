import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { NotificationModule } from 'src/notification/notification.module';
import { PricingService } from './pricing.service';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService, PricingService],
  imports: [PrismaModule, NotificationModule],
})
export class SurveyModule { }
