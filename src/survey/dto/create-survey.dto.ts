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
import { QuestionType, SurveyStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionAlongDto {
  @ApiProperty({ example: 'What is your primary programming language?' })
  @IsString()
  text: string;

  @ApiProperty({ enum: QuestionType, example: QuestionType.SINGLE_CHOICE })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiPropertyOptional({ example: [{ id: 1, text: 'TypeScript' }, { id: 2, text: 'Python' }] })
  @IsOptional()
  @IsArray()
  options?: any[];

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsString()
  scaleMin?: string;

  @ApiPropertyOptional({ example: '5' })
  @IsOptional()
  @IsString()
  scaleMax?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  userId?: number;

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

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  levels?: number;

  @ApiPropertyOptional({ example: 'star' })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiPropertyOptional({ example: [] })
  statements?: any[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: 'Select the option that best describes your daily routine.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  maxFiles?: number;

  @ApiPropertyOptional({ example: 2048 })
  @IsOptional()
  @IsInt()
  maxSize?: number;

  @ApiPropertyOptional({ example: [] })
  @IsOptional()
  @IsArray()
  uploadedFiles?: any[];

  @ApiPropertyOptional()
  @IsOptional()
  matrix?: any;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchCondition?: string;
}

export class CreateSurveyDto {
  @ApiPropertyOptional({ example: [1, 2], description: 'Interest category IDs' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  surveyInterestIds?: number[];

  @ApiPropertyOptional({ example: 'Developer Experience & Satisfaction 2026' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'A comprehensive survey measuring developer tooling preferences and satisfaction.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: SurveyStatus, example: SurveyStatus.DRAFT })
  @IsOptional()
  @IsString()
  status?: SurveyStatus;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  requireResponse?: boolean;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsInt()
  minResponse?: number;

  @ApiPropertyOptional({ example: '2026-09-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2026-09-15T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiPropertyOptional({ example: 'Needs clearer target audience' })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiPropertyOptional({ type: [CreateQuestionAlongDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionAlongDto)
  questions?: CreateQuestionAlongDto[];

  @ApiPropertyOptional({ example: 'Market Research' })
  @IsOptional()
  @IsString()
  surveyPurpose?: string;

  @ApiPropertyOptional({ example: 'general' })
  @IsOptional()
  @IsString()
  targetAudience?: string;

  @ApiPropertyOptional({ example: ['Software Engineer', 'Product Manager'] })
  @IsOptional()
  audienceOccupation?: string[];

  @ApiPropertyOptional({ example: ['Lagos', 'Abuja'] })
  @IsOptional()
  audienceState?: string[];

  @ApiPropertyOptional({ example: 'standard' })
  @IsOptional()
  timeline?: string;

  @ApiPropertyOptional({ example: '10' })
  @IsOptional()
  questionNumber?: string;

  @ApiPropertyOptional({ example: 'online' })
  @IsOptional()
  modeOfCollection?: string;

  @ApiPropertyOptional({ example: 'none' })
  @IsOptional()
  support?: string;

  @ApiPropertyOptional({ example: '50000' })
  @IsOptional()
  price?: string;

  @ApiPropertyOptional({ example: 15, description: 'Estimated time to complete survey in minutes (Factor 1)' })
  @IsOptional()
  @IsInt()
  estimatedTimeMinutes?: number;

  @ApiPropertyOptional({ example: 2, description: 'Recruitment difficulty rating (1-5) (Factor 2)' })
  @IsOptional()
  @IsInt()
  recruitmentDifficulty?: number;

  @ApiPropertyOptional({ example: 3, description: 'Cognitive effort rating (1-5) (Factor 3)' })
  @IsOptional()
  @IsInt()
  cognitiveEffort?: number;

  @ApiPropertyOptional({ example: 1, description: 'Participation requirements / Accessibility rating (1-5) (Factor 4)' })
  @IsOptional()
  @IsInt()
  participationRequirements?: number;

  @ApiPropertyOptional({ example: 1, description: 'Data sensitivity rating (1-5) (Factor 5)' })
  @IsOptional()
  @IsInt()
  dataSensitivity?: number;
}
