import { Test, TestingModule } from '@nestjs/testing';
import { SurveyInterestService } from './survey-interest.service';

describe('SurveyInterestService', () => {
  let service: SurveyInterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyInterestService],
    }).compile();

    service = module.get<SurveyInterestService>(SurveyInterestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
