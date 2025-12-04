import { IsEnum, IsOptional, IsString, IsArray, IsInt, IsBoolean, ValidateNested } from 'class-validator';
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
}
