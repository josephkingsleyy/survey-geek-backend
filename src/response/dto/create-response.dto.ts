import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  Validate,
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

  @IsInt()
  surveyId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MatrixAnswerDto)
  matrixAnswer?: MatrixAnswerDto[]; // for MATRIX type questions
}
