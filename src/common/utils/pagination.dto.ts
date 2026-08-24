import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Limit } from './app';
import { SurveyStatus } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number (default 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Items per page (default 10)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = Limit;

  @ApiPropertyOptional({ enum: SurveyStatus, example: SurveyStatus.PUBLISHED })
  @IsOptional()
  status?: SurveyStatus;

  @ApiPropertyOptional({ example: 'developer' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 'Technology' })
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: '2026-08-24' })
  @IsOptional()
  date?: string;
}
