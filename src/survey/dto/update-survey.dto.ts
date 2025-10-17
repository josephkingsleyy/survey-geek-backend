import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyDto } from './create-survey.dto';
import { SurveyStatus } from '@prisma/client';


export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {
    questions?: never;
    status?: SurveyStatus;

}
