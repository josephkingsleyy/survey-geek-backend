import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyInterestDto } from './create-survey-interest.dto';

export class UpdateSurveyInterestDto extends PartialType(CreateSurveyInterestDto) {}

