import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateResponseDto {
  @IsInt()
  userId: number;

  @IsInt()
  questionId: number;

  @IsOptional()
  @IsString()
  answerText?: string; // for text-based answers

  @IsOptional()
  @IsString()
  answerOption?: string; // for SINGLE_CHOICE

  @IsOptional()
  @IsArray()
  answerOptions?: string[]; // for MULTIPLE_CHOICE

  @IsOptional()
  @IsInt()
  rating?: number; // for RATING, LIKERT, NPS

  @IsOptional()
  @IsString()
  uploadUrl?: string; // for uploads
}
