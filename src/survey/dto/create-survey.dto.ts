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
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { QuestionType } from '@prisma/client';


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
}

export class CreateSurveyDto {
  @IsArray()
  @IsInt({ each: true }) // ✅ ensures each item in array is an integer
  surveyInterestIds?: number[];

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string; // default handled in Prisma

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

  // 🔹 Optional nested questions
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionAlongDto)
  questions?: CreateQuestionAlongDto[];
}
