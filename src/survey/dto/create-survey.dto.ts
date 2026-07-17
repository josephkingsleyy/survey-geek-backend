import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsInt,
  ValidateNested,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType, SurveyStatus } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';

export class CreateQuestionAlongDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @IsOptional()
  @IsInt()
  scaleMin?: number;

  @IsOptional()
  @IsInt()
  scaleMax?: number;

  @IsInt()
  userId?: number;

  @IsOptional()
  @IsBoolean()
  allowUpload?: boolean;

  @IsOptional()
  @IsBoolean()
  allowTime?: boolean;

  @IsOptional()
  @IsString()
  allowedRange?: string;

  @IsOptional()
  @IsString()
  timeFormat?: string;
}

export class CreateSurveyDto {
  @IsArray()
  @IsInt({ each: true })
  surveyInterestIds?: number[];

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: SurveyStatus; // default handled in Prisma

  @IsOptional()
  @IsBoolean()
  requireResponse?: boolean;

  @IsOptional()
  @IsInt()
  minResponse?: number;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsString()
  rejectionReason?: string;

  // 🔹 Optional nested questions
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionAlongDto)
  questions?: CreateQuestionAlongDto[];

  @IsOptional()
  @IsString()
  surveyPurpose?: string;

  @IsOptional()
  @IsString()
  targetAudience?: string;

  @IsOptional()
  audienceOccupation?: string[];

  @IsOptional()
  audienceState?: string[];

  @IsOptional()
  timeline?: string;

  @IsOptional()
  questionNumber?: string;

  @IsOptional()
  modeOfCollection?: string;

  @IsOptional()
  support?: string;

  @IsOptional()
  price?: string;
}


