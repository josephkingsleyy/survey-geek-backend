import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateNotificationDto) {
    try {
      return await this.prisma.notification.create({ data: dto });
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async findUserNotifications(userId: number, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        this.prisma.notification.count({
          where: { userId },
        }),
      ]);
      return {
        data: notifications,
        meta: {
          total, page, limit
        }
      };

    } catch (error) {
      console.error('Error fetching user notifications:', error);
      throw error;
    }
  }

  async markAsRead(notificationId: number) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }

  async broadcast(userIds: number[], dto: Omit<CreateNotificationDto, 'userId'>) {
    try {
      const notifications = userIds.map((id) => ({
        userId: id,
        ...dto,
      }));

      return this.prisma.notification.createMany({
        data: notifications,
      });
    } catch (error) {
      console.error('Error broadcasting notifications:', error);
      throw error;
    }

  }
}
