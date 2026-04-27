import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AnswerOptionDto {
  @IsInt()
  id: number;

  @IsString()
  text: string;
}
class MatrixAnswerDto {
  @IsInt()
  rowId: number;

  @IsInt()
  colId: number;
}

export class CreateResponseDto {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsInt()
  questionId: number;

  @IsOptional()
  @IsString()
  answerText?: string; // for text-based answers

  // SINGLE CHOICE
  @IsOptional()
  @ValidateNested()
  @Type(() => AnswerOptionDto)
  answerOption?: AnswerOptionDto;

  // MULTIPLE CHOICE
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionDto)
  answerOptions?: AnswerOptionDto[];

  @IsOptional()
  @IsInt()
  rating?: number; // for RATING, LIKERT, NPS

  @IsOptional()
  @IsString()
  uploadUrl?: string; // for uploads

  @IsOptional()
  @IsInt()
  surveyId?: number;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  matrixAnswer?: any; // for MATRIX type questions (can be array or object)
}
