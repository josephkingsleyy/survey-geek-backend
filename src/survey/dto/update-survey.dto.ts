import { SurveyStatus } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReorderSectionDto {
  @ApiProperty({ example: 1, description: 'Section ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 1, description: 'New section order index' })
  @IsNumber()
  order: number;
}

export class ReorderSectionsDto {
  @ApiProperty({ type: [ReorderSectionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderSectionDto)
  sections: ReorderSectionDto[];
}

export class UpdateQuestionDto {
  @ApiProperty({ example: 1, description: 'Question ID' })
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ example: 'Updated question text?' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ example: 'SINGLE_CHOICE' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: [{ id: 1, text: 'Option 1' }] })
  @IsOptional()
  @IsArray()
  options?: any[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  required?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  showDescription?: boolean;

  @ApiPropertyOptional({ example: 'Question description text' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsString()
  scaleMin?: string;

  @ApiPropertyOptional({ example: '5' })
  @IsOptional()
  @IsString()
  scaleMax?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  allowTime?: boolean;

  @ApiPropertyOptional({ example: 'ANY_DATE' })
  @IsOptional()
  allowedRange?: string;

  @ApiPropertyOptional({ example: '24_HOUR' })
  @IsOptional()
  timeFormat?: string;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  levels?: number;

  @ApiPropertyOptional({ example: 'star' })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiPropertyOptional({ example: [] })
  @IsOptional()
  @IsArray()
  statements?: any[];

  @ApiPropertyOptional({ example: 'general' })
  @IsOptional()
  @IsString()
  targetAudience?: string;

  @ApiPropertyOptional({ example: ['Engineer'] })
  @IsOptional()
  audienceOccupation?: string[];

  @ApiPropertyOptional({ example: ['Lagos'] })
  @IsOptional()
  audienceState?: string[];

  @ApiPropertyOptional({ example: ['standard'] })
  @IsOptional()
  timeline?: string[];

  @ApiPropertyOptional({ example: ['10'] })
  @IsOptional()
  questionNumber?: string[];

  @ApiPropertyOptional({ example: ['online'] })
  @IsOptional()
  modeOfCollection?: string[];

  @ApiPropertyOptional({ example: ['none'] })
  @IsOptional()
  support?: string[];

  @ApiPropertyOptional({ example: ['50000'] })
  @IsOptional()
  price?: string[];

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  maxFiles?: number;

  @ApiPropertyOptional({ example: 2048 })
  @IsOptional()
  @IsInt()
  maxSize?: number;

  @ApiPropertyOptional({ example: [] })
  @IsOptional()
  @IsArray()
  uploadedFiles?: any[];

  @ApiPropertyOptional()
  @IsOptional()
  matrix?: any;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchCondition?: string;
}

export class UpdateSectionDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Updated Section Title' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Updated section description' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  order?: number;

  @ApiProperty({ type: [UpdateQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  questions: UpdateQuestionDto[];
}

export class UpdateSurveyDto {
  @ApiPropertyOptional({ example: 'Updated Survey Title 2026' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated survey description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [UpdateSectionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSectionDto)
  sections?: UpdateSectionDto[];

  @ApiPropertyOptional({ enum: SurveyStatus, example: SurveyStatus.PUBLISHED })
  @IsOptional()
  status?: SurveyStatus;

  @ApiPropertyOptional({ example: 'Rejection note if applicable' })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiPropertyOptional({ example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  surveyInterestIds?: number[];

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  minResponse?: number;

  @ApiPropertyOptional({ example: 500 })
  @IsOptional()
  maxResponse?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  requireResponse?: boolean;

  @ApiPropertyOptional({ example: '2026-09-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2026-09-30T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiPropertyOptional({ example: 'Customer Satisfaction' })
  @IsOptional()
  @IsString()
  surveyPurpose?: string;

  @ApiPropertyOptional({ example: 'general' })
  @IsOptional()
  @IsString()
  targetAudience?: string;

  @ApiPropertyOptional({ example: ['Software Engineer'] })
  @IsOptional()
  audienceOccupation?: string[];

  @ApiPropertyOptional({ example: ['Lagos'] })
  @IsOptional()
  audienceState?: string[];

  @ApiPropertyOptional({ example: 'standard' })
  @IsOptional()
  timeline?: string;

  @ApiPropertyOptional({ example: '10' })
  @IsOptional()
  questionNumber?: string;

  @ApiPropertyOptional({ example: 'online' })
  @IsOptional()
  modeOfCollection?: string;

  @ApiPropertyOptional({ example: 'none' })
  @IsOptional()
  support?: string;

  @ApiPropertyOptional({ example: '50000' })
  @IsOptional()
  price?: string;

  @ApiPropertyOptional({ example: 15 })
  @IsOptional()
  @IsInt()
  estimatedTimeMinutes?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  recruitmentDifficulty?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  cognitiveEffort?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  participationRequirements?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  dataSensitivity?: number;
}
