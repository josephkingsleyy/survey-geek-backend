import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { CronsModule } from './crons/crons.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import { BillingModule } from './billing/billing.module';
import { QuestionModule } from './question/question.module';
import { ResponseModule } from './response/response.module';
import { SectionModule } from './section/section.module';
import { SurveyModule } from './survey/survey.module';
import { SurveyInterestModule } from './survey-interest/survey-interest.module';
import { TicketModule } from './ticket/ticket.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    BillingModule,
    CronsModule,
    NotificationModule,
    PaymentModule,
    PrismaModule,
    QuestionModule,
    ResponseModule,
    SectionModule,
    SurveyModule,
    SurveyInterestModule,
    TicketModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60,        // time-to-live in seconds (1 minute)
        limit: 10,      // max requests per IP within that minute
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
