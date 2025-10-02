import { Module } from '@nestjs/common';
import { SurveyInterestService } from './survey-interest.service';
import { SurveyInterestController } from './survey-interest.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  controllers: [SurveyInterestController],
  imports: [PrismaModule],
  providers: [SurveyInterestService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class SurveyInterestModule { }
