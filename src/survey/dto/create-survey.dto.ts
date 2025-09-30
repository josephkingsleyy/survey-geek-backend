import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsInt,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export class CreateSurveyDto {
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
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
