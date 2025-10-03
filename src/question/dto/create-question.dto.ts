import { IsEnum, IsOptional, IsString, IsArray, IsInt, IsBoolean } from 'class-validator';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsInt()
  surveyId: number;

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
}


