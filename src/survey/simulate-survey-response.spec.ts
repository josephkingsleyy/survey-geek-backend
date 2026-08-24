import { Test, TestingModule } from '@nestjs/testing';
import { SurveyPointService } from './survey-point.service';
import { ResponseService } from '../response/response.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { QuestionType, SurveyStatus } from '@prisma/client';

describe('Simulate Survey Response & Automatic Point Allotment', () => {
  let surveyPointService: SurveyPointService;
  let responseService: ResponseService;

  let walletPoints = 0;
  let walletTransactions: any[] = [];
  let rewardLogs: any[] = [];
  let notifications: any[] = [];
  let responses: any[] = [];

  const mockSurvey = {
    id: 101,
    title: 'Developer Experience Survey 2026',
    userId: 1,
    status: SurveyStatus.PUBLISHED,
    calculatedLevel: 3,
    calculatedPoints: 300,
    sections: [
      {
        id: 1,
        title: 'General Section',
        questions: [
          { id: 201, text: 'What is your primary programming language?', required: true, type: QuestionType.SINGLE_CHOICE },
          { id: 202, text: 'Rate your overall satisfaction with your current IDE:', required: true, type: QuestionType.RATING },
        ],
      },
    ],
  };

  const mockPrismaService = {
    surveyPointConfig: {
      findUnique: jest.fn().mockResolvedValue(null),
    },
    survey: {
      findUnique: jest.fn().mockResolvedValue(mockSurvey),
      findFirst: jest.fn().mockResolvedValue(mockSurvey),
    },
    response: {
      upsert: jest.fn().mockImplementation(({ where, create }) => {
        const userId = where.userId_questionId.userId;
        const questionId = where.userId_questionId.questionId;
        const surveyId = create.survey?.connect?.id || 101;

        const existingIndex = responses.findIndex((r) => r.userId === userId && r.questionId === questionId);
        if (existingIndex >= 0) {
          responses[existingIndex] = { ...responses[existingIndex], updatedAt: new Date() };
          return responses[existingIndex];
        }

        const newResponse = {
          id: responses.length + 1,
          userId,
          questionId,
          surveyId,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...create,
        };
        responses.push(newResponse);
        return newResponse;
      }),
      findMany: jest.fn().mockImplementation(({ where }) => {
        return responses.filter((r) => r.userId === where.userId && r.surveyId === where.surveyId);
      }),
    },
    surveyRewardLog: {
      findUnique: jest.fn().mockImplementation(({ where }) => {
        return rewardLogs.find(
          (log) => log.userId === where.userId_surveyId.userId && log.surveyId === where.userId_surveyId.surveyId,
        );
      }),
      create: jest.fn().mockImplementation(({ data }) => {
        rewardLogs.push(data);
        return data;
      }),
    },
    wallet: {
      findUnique: jest.fn().mockImplementation(() => ({ id: 5, userId: 2, points: walletPoints })),
      create: jest.fn().mockImplementation(({ data }) => ({ id: 5, ...data })),
      update: jest.fn().mockImplementation(({ data }) => {
        if (data.points?.increment) {
          walletPoints += data.points.increment;
        }
        return { id: 5, userId: 2, points: walletPoints };
      }),
    },
    walletTransaction: {
      create: jest.fn().mockImplementation(({ data }) => {
        walletTransactions.push(data);
        return data;
      }),
    },
    notification: {
      create: jest.fn().mockImplementation(({ data }) => {
        notifications.push(data);
        return data;
      }),
    },
    $transaction: jest.fn((cb) => cb(mockPrismaService)),
  };

  const mockNotificationService = {
    create: jest.fn().mockImplementation((data) => {
      notifications.push(data);
    }),
  };

  beforeEach(async () => {
    walletPoints = 0;
    walletTransactions = [];
    rewardLogs = [];
    notifications = [];
    responses = [];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyPointService,
        ResponseService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compile();

    surveyPointService = module.get<SurveyPointService>(SurveyPointService);
    responseService = module.get<ResponseService>(ResponseService);
  });

  it('STEP 1: Partial Answer -> Survey not completed yet (0 points awarded)', async () => {
    const respondentId = 2;

    const res1 = await responseService.create(
      {
        surveyId: 101,
        questionId: 201,
        answerOption: { id: 1, text: 'TypeScript' },
      },
      respondentId,
    );

    expect(res1.surveyCompleted).toBe(false);
    expect(res1.reward).toBeNull();
    expect(walletPoints).toBe(0);
  });

  it('STEP 2: Complete All Questions -> Automatically awards 300 Points to Respondent Wallet!', async () => {
    const respondentId = 2;

    // Answer Q1
    await responseService.create(
      {
        surveyId: 101,
        questionId: 201,
        answerOption: { id: 1, text: 'TypeScript' },
      },
      respondentId,
    );

    // Answer Q2 (Final required question)
    const res2 = await responseService.create(
      {
        surveyId: 101,
        questionId: 202,
        rating: 5,
      },
      respondentId,
    );

    // Assert API response output
    expect(res2.surveyCompleted).toBe(true);
    expect(res2.reward).toBeDefined();
    expect(res2.reward.awarded).toBe(true);
    expect(res2.reward.pointsAwarded).toBe(300);

    // Assert Wallet Points Credited
    expect(walletPoints).toBe(300);

    // Assert WalletTransaction logged
    expect(walletTransactions.length).toBe(1);
    expect(walletTransactions[0].points).toBe(300);
    expect(walletTransactions[0].type).toBe('points_earned');

    // Assert Notification created
    expect(notifications.length).toBeGreaterThan(0);
  });

  it('STEP 3: Resubmitting Answer -> Single-Award Protection prevents duplicate points', async () => {
    const respondentId = 2;

    // Complete survey first time -> gets 300 points
    await responseService.create({ surveyId: 101, questionId: 201, answerOption: { id: 1, text: 'TypeScript' } }, respondentId);
    await responseService.create({ surveyId: 101, questionId: 202, rating: 5 }, respondentId);

    expect(walletPoints).toBe(300);

    // Respondent edits Q2 answer
    const resDuplicate = await responseService.create({ surveyId: 101, questionId: 202, rating: 4 }, respondentId);

    expect(resDuplicate.surveyCompleted).toBe(true);
    expect(resDuplicate.reward.awarded).toBe(false);
    expect(resDuplicate.reward.pointsAwarded).toBe(0);
    expect(walletPoints).toBe(300); // Balance remains 300, no duplicate credit!
  });
});
