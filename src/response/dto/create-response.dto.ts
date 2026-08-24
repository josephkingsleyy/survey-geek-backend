import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AnswerOptionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'TypeScript' })
  @IsString()
  text: string;
}

export class MatrixAnswerDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  rowId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  colId: number;
}

export class CreateResponseDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({ example: 10, description: 'Question ID being answered' })
  @IsInt()
  questionId: number;

  @ApiPropertyOptional({ example: 'I prefer NestJS for its modular TypeScript structure.' })
  @IsOptional()
  @IsString()
  answerText?: string;

  @ApiPropertyOptional({ type: AnswerOptionDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AnswerOptionDto)
  answerOption?: AnswerOptionDto;

  @ApiPropertyOptional({ type: [AnswerOptionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionDto)
  answerOptions?: AnswerOptionDto[];

  @ApiPropertyOptional({ example: 5, description: 'Rating value for RATING, LIKERT, or NPS questions (1-5 or 1-10)' })
  @IsOptional()
  @IsInt()
  rating?: number;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/demo/image/upload/v1234/sample.png' })
  @IsOptional()
  @IsString()
  uploadUrl?: string;

  @ApiPropertyOptional({ example: 1, description: 'Target Survey ID' })
  @IsOptional()
  @IsInt()
  surveyId?: number;

  @ApiPropertyOptional({ example: 'dev-exp-2026', description: 'Target Survey slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: { rowId: 1, colId: 2 } })
  @IsOptional()
  matrixAnswer?: any;
}
