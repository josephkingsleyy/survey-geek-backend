import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { SurveyPointService } from 'src/survey/survey-point.service';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponseService,
        { provide: PrismaService, useValue: {} },
        { provide: NotificationService, useValue: {} },
        { provide: SurveyPointService, useValue: {} },
      ],
    }).compile();

    service = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
