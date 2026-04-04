import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  type: string; // "payment" | "survey" | "system" | "response"

  @IsBoolean()
  @IsOptional()
  isStarred?: boolean;

  @IsBoolean()
  @IsOptional()
  isImportant?: boolean;

  @IsBoolean()
  @IsOptional()
  read?: boolean;
}
