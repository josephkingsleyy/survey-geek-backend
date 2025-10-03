import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationGateway } from './notification.gateway';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  imports: [PrismaModule],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule { }
