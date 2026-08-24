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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OptionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Option A' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  order?: number;
}

export class StatementsDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Statement text' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  order?: number;
}

export class FilesDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' })
  @IsString()
  url: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  order?: number;
}

export class MatrixFieldDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiPropertyOptional({ example: 'add' })
  @IsOptional()
  @IsString()
  operator?: string;

  @ApiPropertyOptional({ example: ['Row 1', 'Row 2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rows?: string[];

  @ApiPropertyOptional({ example: ['Col 1', 'Col 2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cols?: string[];

  @ApiPropertyOptional({ example: [['1', '2'], ['3', '4']] })
  @IsOptional()
  @IsArray()
  @IsArray({ each: true })
  data?: string[][];
}

export enum QuestionStatusDto {
  DRAFT = 'DRAFT',
  PUBLISH = 'PUBLISH',
}

export class CreateQuestionDto {
  @ApiProperty({ example: 'How satisfied are you with our product?' })
  @IsString()
  text: string;

  @ApiProperty({ enum: QuestionType, example: QuestionType.RATING })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ example: 1, description: 'ID of parent Section' })
  @IsInt()
  sectionId: number;

  @ApiPropertyOptional({ type: [OptionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options?: OptionDto[];

  @ApiPropertyOptional({ type: [StatementsDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatementsDto)
  statements?: StatementsDto[];

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
  @IsBoolean()
  allowUpload?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  allowTime?: boolean;

  @ApiPropertyOptional({ example: 'ANY_DATE' })
  @IsOptional()
  @IsString()
  allowedRange?: string;

  @ApiPropertyOptional({ example: '24_HOUR' })
  @IsOptional()
  @IsString()
  timeFormat?: string;

  @ApiPropertyOptional({ example: 'Rate from 1 to 5 stars.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  levels?: number;

  @ApiPropertyOptional({ example: 'star' })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  maxFiles?: number;

  @ApiPropertyOptional({ type: [FilesDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilesDto)
  uploadedFiles?: FilesDto[];

  @ApiPropertyOptional({ example: 2048 })
  @IsOptional()
  @IsInt()
  maxSize?: number;

  @ApiPropertyOptional({ type: MatrixFieldDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => MatrixFieldDto)
  matrix?: MatrixFieldDto;

  @ApiPropertyOptional({ enum: QuestionStatusDto, example: QuestionStatusDto.PUBLISH })
  @IsOptional()
  @IsEnum(QuestionStatusDto)
  status?: QuestionStatusDto;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchCondition?: string;
}
