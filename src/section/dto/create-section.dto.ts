import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSectionDto {
  @IsOptional()
  @IsNumber()
  surveyId: number;

  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  slug?: string;
}
