import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [PrismaModule]
})
export class SurveyModule { }
