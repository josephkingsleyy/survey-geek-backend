import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { PaginationDto } from 'src/ticket/dto/update-ticket.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Roles('admin')
  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.notificationService.findAllNotifications(paginationDto.page, paginationDto.limit);
  }

  @Get('my-notifications')
  findAllMyNotifications(
    @CurrentUser('userId') userId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.notificationService.findUserNotifications(userId, paginationDto.page, paginationDto.limit);
  }

  @Get(':id')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateNotificationDto>) {
    return this.notificationService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }

  @Post('broadcast')
  async broadcast(
    @Body() body: { userIds: number[]; dto: Omit<CreateNotificationDto, 'userId'> },
  ) {
    console.log(body.dto, body.userIds);
    
    return this.notificationService.broadcast(body.userIds, body.dto);
  }
}
