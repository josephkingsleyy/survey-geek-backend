import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { TicketModule } from './ticket/ticket.module';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { ResponseModule } from './response/response.module';
import { BillingModule } from './billing/billing.module';
import { PaymentModule } from './payment/payment.module';
import { Scheduler } from 'rxjs';
import { ScheduleModule } from '@nestjs/schedule';
import { CronsModule } from './crons/crons.module';

@Global()
@Module({
  imports: [PrismaModule,
    AuthModule,
    TicketModule,
    SurveyModule,
    QuestionModule,
    ResponseModule,
    BillingModule,
    PaymentModule,
    ScheduleModule.forRoot(),
    CronsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule { }
