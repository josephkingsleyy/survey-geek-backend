import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/utils/pagination.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Roles('Admin')
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.notificationService.findAllNotifications(
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Get('my-notifications')
  findAllMyNotifications(
    @CurrentUser('userId') userId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.notificationService.findUserNotifications(
      userId,
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Get(':id')
  getNotifications(@Param('id') id: string) {
    return this.notificationService.getNotificationCount(+id);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateNotificationDto>) {
    return this.notificationService.update(+id, dto);
  }

  @Patch(':id/toggle-starred')
  toggleStarred(@Param('id') id: string) {
    return this.notificationService.toggleStarred(+id);
  }

  @Patch(':id/toggle-important')
  toggleImportant(@Param('id') id: string) {
    return this.notificationService.toggleImportant(+id);
  }

  @Patch('mark-all-read')
  markAllRead(@CurrentUser('userId') userId: number) {
    return this.notificationService.markAllAsRead(userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }

  @Post('broadcast')
  async broadcast(
    @Body()
    body: {
      userIds: number[];
      dto: Omit<CreateNotificationDto, 'userId'>;
    },
  ) {
    console.log(body.dto, body.userIds);

    return this.notificationService.broadcast(body.userIds, body.dto);
  }
}
