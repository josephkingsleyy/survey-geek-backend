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
  @IsString()
  scaleMin?: string;

  @IsOptional()
  @IsString()
  scaleMax?: string;

  @IsOptional()
  allowTime?: boolean;

  @IsOptional()
  allowedRange?: string;

  @IsOptional()
  timeFormat?: string;

  @IsOptional()
  @IsInt()
  levels?: number;

  @IsOptional()
  @IsString()
  symbol?: string;

  @IsOptional()
  @IsArray()
  statements?: any[];

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

  @IsOptional()
  @IsInt()
  maxFiles?: number;

  @IsOptional()
  @IsInt()
  maxSize?: number;

  @IsOptional()
  @IsArray()
  uploadedFiles?: any[];

  @IsOptional()
  matrix?: any;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsString()
  branchCondition?: string;
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
