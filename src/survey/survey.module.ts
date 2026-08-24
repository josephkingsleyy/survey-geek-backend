import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { SurveyPointController } from './survey-point.controller';
import { SurveyPointService } from './survey-point.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationModule } from 'src/notification/notification.module';
import { PricingService } from './pricing.service';

@Module({
  controllers: [SurveyController, SurveyPointController],
  providers: [SurveyService, PricingService, SurveyPointService],
  imports: [PrismaModule, NotificationModule],
  exports: [SurveyService, SurveyPointService],
})
export class SurveyModule { }

