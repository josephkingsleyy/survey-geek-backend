import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyInterestService } from './survey-interest.service';
import { ChooseSurveyInterestsDto, CreateSurveyInterestDto } from './dto/create-survey-interest.dto';
import { UpdateSurveyInterestDto } from './dto/update-survey-interest.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('survey-interest')
export class SurveyInterestController {
  constructor(private readonly surveyInterestService: SurveyInterestService) { }


  @Post('')
  async createSurveyInterest(
    @Body() dto: CreateSurveyInterestDto,
  ) {
    return this.surveyInterestService.create(dto);
  }

  @Get()
  findAll() {
    return this.surveyInterestService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateSurveyInterestDto,
  ) {
    return this.surveyInterestService.update(id, dto);
  }

  @Post('choose')
  async chooseInterests(
    @CurrentUser('sub') sub: number,
    @Body() dto: ChooseSurveyInterestsDto,
  ) {
    return this.surveyInterestService.chooseMany({
      interestIds: dto.interestIds,
    }, sub);
  }

  @Post('create-and-choose')
  async createAndChoose(
    @CurrentUser('sub') sub: number,
    @Body() dto: CreateSurveyInterestDto,
  ) {
    return this.surveyInterestService.createAndChoose(sub, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
  ) {
    return this.surveyInterestService.delete(id);
  }

}
