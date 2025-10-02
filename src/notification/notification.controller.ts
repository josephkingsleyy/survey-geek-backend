import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { PaginationDto } from 'src/ticket/dto/update-ticket.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll(
    @CurrentUser('userId') userId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.notificationService.findUserNotifications(userId, paginationDto.page, paginationDto.limit);
  }

  @Get(':id')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(+id);
  }

  @Post('broadcast')
  async broadcast(
    @Body() body: { userIds: number[]; dto: Omit<CreateNotificationDto, 'userId'> },
  ) {
    return this.notificationService.broadcast(body.userIds, body.dto);
  }
}
