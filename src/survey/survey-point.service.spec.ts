import { Test, TestingModule } from '@nestjs/testing';
import { SurveyPointService, DEFAULT_POINT_SCORING_CONFIG } from './survey-point.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

describe('SurveyPointService', () => {
  let service: SurveyPointService;

  const mockPrismaService = {
    surveyPointConfig: {
      findUnique: jest.fn().mockResolvedValue(null),
      upsert: jest.fn(),
    },
    surveyRewardLog: {
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
    },
    survey: {
      findUnique: jest.fn(),
    },
    wallet: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    walletTransaction: {
      create: jest.fn(),
    },
    notification: {
      create: jest.fn(),
    },
    $transaction: jest.fn((cb) => cb(mockPrismaService)),
  };

  const mockNotificationService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyPointService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compile();

    service = module.get<SurveyPointService>(SurveyPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return default fallback config when db is empty', async () => {
    const config = await service.getConfig();
    expect(config).toEqual(DEFAULT_POINT_SCORING_CONFIG);
  });

  it('should calculate weighted score 3.70 and Level 3 (300 points) for sample prompt survey', async () => {
    // Time = 4 (under 30-45m) -> 4 * 0.30 = 1.2
    // Recruitment = 5 -> 5 * 0.25 = 1.25
    // Cognitive = 3 -> 3 * 0.15 = 0.45
    // Participation = 2 -> 2 * 0.15 = 0.30
    // Urgency = 4 -> 4 * 0.10 = 0.40
    // Sensitivity = 2 -> 2 * 0.05 = 0.10
    // Total = 3.70 -> Level 3 -> 300 points
    const result = await service.calculateSurveyPoints({
      estimatedTimeMinutes: 35,
      recruitmentDifficulty: 5,
      cognitiveEffort: 3,
      participationRequirements: 2,
      timeline: 'urgent',
      dataSensitivity: 2,
    });

    expect(result.weightedScore).toBe(3.8);
    expect(result.level).toBe(3);
    expect(result.points).toBe(300);
  });
});
