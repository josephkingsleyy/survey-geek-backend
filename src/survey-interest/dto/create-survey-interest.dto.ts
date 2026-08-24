import { ArrayNotEmpty, IsArray, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSurveyInterestDto {
  @ApiProperty({ example: 'Technology', description: 'Name of the survey interest category' })
  @IsString()
  name: string;
}

export class ChooseSurveyInterestsDto {
  @ApiProperty({ example: [1, 2, 3], description: 'Array of survey interest IDs selected by user' })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  interestIds: number[];
}
