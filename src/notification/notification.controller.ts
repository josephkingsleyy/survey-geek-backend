import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/utils/pagination.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @ApiOperation({ summary: 'Create a notification' })
  @ApiResponse({ status: 201, description: 'Notification created.' })
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @ApiOperation({ summary: 'Get all notifications (Admin)' })
  @Roles('Admin')
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.notificationService.findAllNotifications(
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @ApiOperation({ summary: 'Get notifications for authenticated user' })
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

  @ApiOperation({ summary: 'Get notification count for user ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Get(':id')
  getNotifications(@Param('id') id: string) {
    return this.notificationService.getNotificationCount(+id);
  }

  @ApiOperation({ summary: 'Mark notification as read by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(+id);
  }

  @ApiOperation({ summary: 'Update notification by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateNotificationDto>) {
    return this.notificationService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Toggle starred status for notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @Patch(':id/toggle-starred')
  toggleStarred(@Param('id') id: string) {
    return this.notificationService.toggleStarred(+id);
  }

  @ApiOperation({ summary: 'Toggle important status for notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @Patch(':id/toggle-important')
  toggleImportant(@Param('id') id: string) {
    return this.notificationService.toggleImportant(+id);
  }

  @ApiOperation({ summary: 'Mark all notifications as read for current user' })
  @Patch('mark-all-read')
  markAllRead(@CurrentUser('userId') userId: number) {
    return this.notificationService.markAllAsRead(userId);
  }

  @ApiOperation({ summary: 'Delete notification by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }

  @ApiOperation({ summary: 'Broadcast notification to multiple users' })
  @Post('broadcast')
  async broadcast(
    @Body()
    body: {
      userIds: number[];
      dto: Omit<CreateNotificationDto, 'userId'>;
    },
  ) {
    return this.notificationService.broadcast(body.userIds, body.dto);
  }
}
