import { ArrayNotEmpty, IsArray, IsInt, IsString } from 'class-validator';

export class CreateSurveyInterestDto {
  @IsString()
  name: string;
}


export class ChooseSurveyInterestsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  interestIds: number[];
}