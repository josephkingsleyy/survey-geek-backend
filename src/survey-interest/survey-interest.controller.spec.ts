import { Test, TestingModule } from '@nestjs/testing';
import { SurveyInterestController } from './survey-interest.controller';
import { SurveyInterestService } from './survey-interest.service';

describe('SurveyInterestController', () => {
  let controller: SurveyInterestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyInterestController],
      providers: [SurveyInterestService],
    }).compile();

    controller = module.get<SurveyInterestController>(SurveyInterestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
