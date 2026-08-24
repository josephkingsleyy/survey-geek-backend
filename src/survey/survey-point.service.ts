import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

export interface PointScoringConfig {
  weights: {
    time: number;
    recruitment: number;
    cognitive: number;
    participation: number;
    urgency: number;
    sensitivity: number;
  };
  levels: Array<{
    level: number;
    minScore: number;
    maxScore: number;
    points: number;
  }>;
}

export const DEFAULT_POINT_SCORING_CONFIG: PointScoringConfig = {
  weights: {
    time: 0.30,
    recruitment: 0.25,
    cognitive: 0.15,
    participation: 0.15,
    urgency: 0.10,
    sensitivity: 0.05,
  },
  levels: [
    { level: 1, minScore: 1.0, maxScore: 2.0, points: 100 },
    { level: 2, minScore: 2.01, maxScore: 3.0, points: 200 },
    { level: 3, minScore: 3.01, maxScore: 4.0, points: 300 },
    { level: 4, minScore: 4.01, maxScore: 5.0, points: 400 },
  ],
};

export interface PartialPointScoringConfig {
  weights?: Partial<PointScoringConfig['weights']>;
  levels?: PointScoringConfig['levels'];
}

@Injectable()
export class SurveyPointService {
  private readonly logger = new Logger(SurveyPointService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Get the active scoring model configuration from DB, or fallback to system defaults.
   */
  async getConfig(): Promise<PointScoringConfig> {
    try {
      const dbConfig = await this.prisma.surveyPointConfig.findUnique({
        where: { id: 1 },
      });

      if (dbConfig && dbConfig.weights && dbConfig.levels) {
        return {
          weights: dbConfig.weights as unknown as PointScoringConfig['weights'],
          levels: dbConfig.levels as unknown as PointScoringConfig['levels'],
        };
      }
    } catch (error) {
      this.logger.warn(`Could not load survey point config from DB, using fallback defaults: ${error.message}`);
    }

    return DEFAULT_POINT_SCORING_CONFIG;
  }

  /**
   * Update the production scoring model configuration (Single production endpoint).
   */
  async updateConfig(newConfig: PartialPointScoringConfig): Promise<PointScoringConfig> {
    const currentConfig = await this.getConfig();

    const updatedWeights = {
      ...currentConfig.weights,
      ...(newConfig.weights || {}),
    };

    const updatedLevels = newConfig.levels || currentConfig.levels;

    const saved = await this.prisma.surveyPointConfig.upsert({
      where: { id: 1 },
      update: {
        weights: JSON.parse(JSON.stringify(updatedWeights)),
        levels: JSON.parse(JSON.stringify(updatedLevels)),
      },
      create: {
        id: 1,
        weights: JSON.parse(JSON.stringify(updatedWeights)),
        levels: JSON.parse(JSON.stringify(updatedLevels)),
      },
    });

    return {
      weights: saved.weights as unknown as PointScoringConfig['weights'],
      levels: saved.levels as unknown as PointScoringConfig['levels'],
    };
  }

  /**
   * Calculates the Time Commitment Score (1 - 5).
   */
  calculateTimeScore(surveyData: any): number {
    let estimatedMins = surveyData.estimatedTimeMinutes;

    if (!estimatedMins) {
      let questionCount = 0;

      if (Array.isArray(surveyData.questions)) {
        questionCount = surveyData.questions.length;
      } else if (surveyData.questionNumber) {
        const val = String(surveyData.questionNumber);
        if (val.includes('+')) {
          questionCount = Number(val.replace('+', ''));
        } else if (val.includes('-')) {
          const [, max] = val.split('-');
          questionCount = Number(max);
        } else {
          questionCount = Number(val) || 0;
        }
      }

      // Estimate ~1.5 mins per question
      estimatedMins = questionCount > 0 ? questionCount * 1.5 : 5;
    }

    if (estimatedMins < 5) return 1;
    if (estimatedMins <= 15) return 2;
    if (estimatedMins <= 30) return 3;
    if (estimatedMins <= 45) return 4;
    return 5;
  }

  /**
   * Calculates the Urgency Score (1 - 5).
   */
  calculateUrgencyScore(surveyData: any): number {
    const timeline = (surveyData.timeline || '').toLowerCase().trim();
    if (timeline.includes('urgent') || timeline.includes('24')) return 5;
    if (timeline.includes('fast') || timeline.includes('72')) return 3;
    if (timeline.includes('standard') || timeline.includes('normal')) return 1;

    if (surveyData.startDate && surveyData.endDate) {
      const start = new Date(surveyData.startDate).getTime();
      const end = new Date(surveyData.endDate).getTime();
      const diffHours = (end - start) / (1000 * 60 * 60);

      if (diffHours <= 24) return 5;
      if (diffHours <= 72) return 3;
    }

    return 1;
  }

  /**
   * Calculates the Participation Requirements / Accessibility Score (1 - 5).
   */
  calculateParticipationScore(surveyData: any): number {
    if (surveyData.participationRequirements) {
      return Math.min(Math.max(Number(surveyData.participationRequirements), 1), 5);
    }

    const mode = (surveyData.modeOfCollection || '').toLowerCase().trim();
    if (mode.includes('hybrid')) return 4;
    if (mode.includes('field')) return 3;
    if (mode.includes('online')) return 1;

    return 1;
  }

  /**
   * Calculates survey weighted score, level, and points awarded.
   */
  async calculateSurveyPoints(surveyData: any): Promise<{
    weightedScore: number;
    level: number;
    points: number;
  }> {
    const config = await this.getConfig();
    const w = config.weights;

    const timeScore = this.calculateTimeScore(surveyData);
    const recruitmentScore = Math.min(Math.max(Number(surveyData.recruitmentDifficulty || 1), 1), 5);
    const cognitiveScore = Math.min(Math.max(Number(surveyData.cognitiveEffort || 1), 1), 5);
    const participationScore = this.calculateParticipationScore(surveyData);
    const urgencyScore = this.calculateUrgencyScore(surveyData);
    const sensitivityScore = Math.min(Math.max(Number(surveyData.dataSensitivity || 1), 1), 5);

    const rawScore =
      timeScore * w.time +
      recruitmentScore * w.recruitment +
      cognitiveScore * w.cognitive +
      participationScore * w.participation +
      urgencyScore * w.urgency +
      sensitivityScore * w.sensitivity;

    // Round score to 2 decimal places
    const weightedScore = Math.round(rawScore * 100) / 100;

    // Match level from config
    const matchedLevelConfig = config.levels.find(
      (l) => weightedScore >= l.minScore && weightedScore <= l.maxScore,
    ) || config.levels[0];

    return {
      weightedScore,
      level: matchedLevelConfig.level,
      points: matchedLevelConfig.points,
    };
  }

  /**
   * Automatically credit points to respondent upon completing a survey.
   * Single-award guarantee: Ensures user only earns points ONCE per survey.
   */
  async awardPointsOnCompletion(
    userId: number,
    surveyId: number,
  ): Promise<{ awarded: boolean; pointsAwarded: number; message: string }> {
    // 1. Check if user already earned reward for this survey
    const existingLog = await this.prisma.surveyRewardLog.findUnique({
      where: {
        userId_surveyId: {
          userId,
          surveyId,
        },
      },
    });

    if (existingLog) {
      return {
        awarded: false,
        pointsAwarded: 0,
        message: 'Points have already been awarded to this respondent for this survey.',
      };
    }

    // 2. Fetch survey details
    const survey = await this.prisma.survey.findUnique({
      where: { id: surveyId },
      include: {
        sections: {
          include: { questions: true },
        },
      },
    });

    if (!survey) {
      return {
        awarded: false,
        pointsAwarded: 0,
        message: 'Survey not found.',
      };
    }

    // If calculated points is not saved yet on survey, compute it now
    let pointsToAward = survey.calculatedPoints;
    if (!pointsToAward || pointsToAward <= 0) {
      const computed = await this.calculateSurveyPoints(survey);
      pointsToAward = computed.points;
    }

    const reference = `SURVEY_REWARD_${surveyId}_${userId}`;

    try {
      await this.prisma.$transaction(async (tx) => {
        // Ensure wallet exists for user
        let wallet = await tx.wallet.findUnique({ where: { userId } });
        if (!wallet) {
          wallet = await tx.wallet.create({
            data: { userId, points: 0, balance: 0 },
          });
        }

        // Credit wallet points
        await tx.wallet.update({
          where: { id: wallet.id },
          data: { points: { increment: pointsToAward } },
        });

        // Create transaction record
        await tx.walletTransaction.create({
          data: {
            walletId: wallet.id,
            type: 'points_earned',
            points: pointsToAward,
            description: `Earned points for completing survey "${survey.title || 'Survey #' + survey.id}"`,
            reference,
          },
        });

        // Log completion reward
        await tx.surveyRewardLog.create({
          data: {
            userId,
            surveyId,
            points: pointsToAward,
          },
        });

        // Notify respondent
        await tx.notification.create({
          data: {
            userId,
            title: 'Survey Reward Earned!',
            message: `Congratulations! You have earned ${pointsToAward} survey points for completing "${survey.title || 'Survey #' + survey.id}".`,
            type: 'reward',
          },
        });
      });

      return {
        awarded: true,
        pointsAwarded: pointsToAward,
        message: `Successfully awarded ${pointsToAward} survey points!`,
      };
    } catch (error) {
      this.logger.error(`Failed to award survey points for user ${userId} on survey ${surveyId}: ${error.message}`);
      return {
        awarded: false,
        pointsAwarded: 0,
        message: 'Failed to process point award: ' + error.message,
      };
    }
  }
}
