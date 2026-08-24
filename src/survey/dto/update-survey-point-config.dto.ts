import { IsOptional, IsObject, IsArray, ValidateNested, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ScoringWeightsDto {
  @ApiPropertyOptional({ example: 0.30, description: 'Weight for Time Commitment (30%)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  time?: number;

  @ApiPropertyOptional({ example: 0.25, description: 'Weight for Recruitment Difficulty (25%)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  recruitment?: number;

  @ApiPropertyOptional({ example: 0.15, description: 'Weight for Cognitive Effort (15%)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  cognitive?: number;

  @ApiPropertyOptional({ example: 0.15, description: 'Weight for Participation Requirements (15%)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  participation?: number;

  @ApiPropertyOptional({ example: 0.10, description: 'Weight for Response Urgency (10%)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  urgency?: number;

  @ApiPropertyOptional({ example: 0.05, description: 'Weight for Data Sensitivity (5%)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  sensitivity?: number;
}

export class LevelConfigDto {
  @ApiProperty({ example: 1, description: 'Level number (1, 2, 3, 4)' })
  @IsNumber()
  level: number;

  @ApiProperty({ example: 1.0, description: 'Minimum weighted score for level' })
  @IsNumber()
  minScore: number;

  @ApiProperty({ example: 2.0, description: 'Maximum weighted score for level' })
  @IsNumber()
  maxScore: number;

  @ApiProperty({ example: 100, description: 'Survey points awarded to respondent for this level' })
  @IsNumber()
  points: number;
}

export class UpdateSurveyPointConfigDto {
  @ApiPropertyOptional({ type: () => ScoringWeightsDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ScoringWeightsDto)
  weights?: ScoringWeightsDto;

  @ApiPropertyOptional({ type: [LevelConfigDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LevelConfigDto)
  levels?: LevelConfigDto[];
}
