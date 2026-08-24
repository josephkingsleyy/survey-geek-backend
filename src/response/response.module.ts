import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SurveyModule } from 'src/survey/survey.module';

@Module({
  imports: [PrismaModule, NotificationModule, SurveyModule],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}

