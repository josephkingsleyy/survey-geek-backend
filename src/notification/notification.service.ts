import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private gateway: NotificationGateway,
  ) { }

  async create(dto: CreateNotificationDto) {
    try {
      const notification = await this.prisma.notification.create({ data: dto });
      this.gateway.sendToUser(dto.userId, notification);
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async findAllNotifications(page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      const [notifications, total, starred, important, survey, response, others] =
        await Promise.all([
          this.prisma.notification.findMany({
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
          }),
          this.prisma.notification.count(),
          this.prisma.notification.count({
            where: { isStarred: true },
          }),
          this.prisma.notification.count({
            where: { isImportant: true },
          }),
          this.prisma.notification.count({
            where: { type: 'survey' },
          }),
          this.prisma.notification.count({
            where: { type: 'response' },
          }),
          this.prisma.notification.count({
            where: {
              NOT: { type: { in: ['survey', 'response'] } },
            },
          }),
        ]);
      return {
        data: notifications,
        meta: {
          total,
          page,
          limit,
          counts: {
            starred,
            important,
            survey,
            responses: response,
            others,
          },
        },
      };
    } catch (error) {
      console.error('Error fetching user notifications:', error);
      throw error;
    }
  }

  async findUserNotifications(userId: number, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      const [notifications, total, starred, important, survey, response, others] =
        await Promise.all([
          this.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
          }),
          this.prisma.notification.count({ where: { userId } }),
          this.prisma.notification.count({
            where: { userId, isStarred: true },
          }),
          this.prisma.notification.count({
            where: { userId, isImportant: true },
          }),
          this.prisma.notification.count({
            where: { userId, type: 'survey' },
          }),
          this.prisma.notification.count({
            where: { userId, type: 'response' },
          }),
          this.prisma.notification.count({
            where: {
              userId,
              NOT: { type: { in: ['survey', 'response'] } },
            },
          }),
        ]);
      return {
        data: notifications,
        meta: {
          total,
          page,
          limit,
          counts: {
            starred,
            important,
            survey,
            responses: response,
            others,
          },
        },
      };
    } catch (error) {
      console.error('Error fetching user notifications:', error);
      throw error;
    }
  }

  async toggleStarred(id: number) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');
    return this.prisma.notification.update({
      where: { id },
      data: { isStarred: !notification.isStarred },
    });
  }

  async toggleImportant(id: number) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');
    return this.prisma.notification.update({
      where: { id },
      data: { isImportant: !notification.isImportant },
    });
  }

  async markAllAsRead(userId: number) {
    return this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  async markAsRead(notificationId: number) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }

  async broadcast(
    userIds: number[],
    dto: Omit<CreateNotificationDto, 'userId'>,
  ) {
    try {
      const notifications = userIds.map((id) => ({
        userId: id,
        ...dto,
      }));

      await this.prisma.notification.createMany({
        data: notifications,
      });

      this.gateway.broadcastToUsers(userIds, {
        title: dto.title,
        message: dto.message,
        type: dto.type,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error broadcasting notifications:', error);
      throw error;
    }
  }

  async update(id: number, dto: Partial<CreateNotificationDto>) {
    try {
      return await this.prisma.notification.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      console.error(`Error updating notification with ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.notification.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error deleting notification with ID ${id}:`, error);
      throw error;
    }
  }
}
