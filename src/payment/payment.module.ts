import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  imports: [PrismaModule,
    NotificationModule,
  ]
})
export class PaymentModule { }
