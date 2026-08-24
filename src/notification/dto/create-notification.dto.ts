import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 1, description: 'Target user ID' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'Survey Reward Earned!' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'You earned 300 survey points for completing Developer Experience Survey.' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'reward', description: 'Notification type (reward | payment | survey | response | system)' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isStarred?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isImportant?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  read?: boolean;
}
