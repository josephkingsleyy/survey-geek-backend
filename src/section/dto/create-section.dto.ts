import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  surveyId?: number;

  @ApiProperty({ example: 'Section 1: General Preferences' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Questions regarding general daily developer tools.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ example: 'section-1-general-preferences' })
  @IsOptional()
  @IsString()
  slug?: string;
}
