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


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CronsModule,
    NotificationModule,
    PaymentModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
