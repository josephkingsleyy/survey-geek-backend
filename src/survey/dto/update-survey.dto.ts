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

export class ReorderSectionDto {
  @IsNumber()
  id: number;

  @IsNumber()
  order: number;
}

export class ReorderSectionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderSectionDto)
  sections: ReorderSectionDto[];
}

class UpdateQuestionDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsArray()
  options?: any[]; // can be string[] or object[]

  @IsOptional()
  required?: boolean;

  @IsOptional()
  showDescription?: boolean;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsInt()
  scaleMin?: number;

  @IsOptional()
  @IsInt()
  scaleMax?: number;

  @IsOptional()
  allowTime?: boolean;

  @IsOptional()
  allowedRange?: string;

  @IsOptional()
  timeFormat?: string;

  @IsOptional()
  @IsString()
  targetAudience?: string;

  @IsOptional()
  audienceOccupation?: string[];

  @IsOptional()
  audienceState?: string[];

  @IsOptional()
  timeline?: string[];

  @IsOptional()
  questionNumber?: string[];

  @IsOptional()
  modeOfCollection?: string[];

  @IsOptional()
  support?: string[];

  @IsOptional()
  price?: string[];
}

export class UpdateSectionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  order?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  questions: UpdateQuestionDto[];
}

export class UpdateSurveyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSectionDto)
  sections: UpdateSectionDto[];

  @IsOptional()
  status?: SurveyStatus;

  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  surveyInterestIds?: number[];

  @IsOptional()
  minResponse?: number;

  @IsOptional()
  maxResponse?: number;

  @IsOptional()
  requireResponse?: boolean;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

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
