import {
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsInt,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';

class OptionDto {
  @IsInt()
  id: number;

  @IsString()
  text: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
class StatementsDto {
  @IsInt()
  id: number;

  @IsString()
  text: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
class FilesDto {
  @IsInt()
  id: number;

  @IsString()
  url: string;

  @IsOptional()
  @IsInt()
  order?: number;
}

class MatrixFieldDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  operator?: string; // "add" | "subtract" | "multiply" | "divide"

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rows?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cols?: string[];

  @IsOptional()
  @IsArray()
  @IsArray({ each: true })
  data?: string[][]; // e.g., [["1","2"],["3","4"]] — computed client-side
}

export enum QuestionStatusDto {
  DRAFT = 'DRAFT',
  PUBLISH = 'PUBLISH',
}

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsInt()
  sectionId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options?: OptionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatementsDto)
  statements?: StatementsDto[];

  @IsOptional()
  @IsInt()
  scaleMin?: number;

  @IsOptional()
  @IsInt()
  scaleMax?: number;

  @IsOptional()
  @IsBoolean()
  allowUpload?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  @IsInt()
  levels?: number;

  @IsOptional()
  @IsString()
  symbol?: string;

  @IsOptional()
  @IsInt()
  maxFiles?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilesDto)
  uploadedFiles?: FilesDto[];

  @IsOptional()
  @IsInt()
  maxSize?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => MatrixFieldDto)
  matrix?: MatrixFieldDto;

  @IsOptional()
  @IsEnum(QuestionStatusDto)
  status?: QuestionStatusDto;

  @IsOptional()
  @IsInt()
  order?: number;
}
