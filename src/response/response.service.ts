import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { NotificationService } from 'src/notification/notification.service';
import { SurveyPointService } from 'src/survey/survey-point.service';
import { Limit } from 'src/common/utils/app';

@Injectable()
export class ResponseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly surveyPointService: SurveyPointService,
  ) { }

  async create(dto: CreateResponseDto, userId: number) {
    try {
      const normalizeJson = (value: any) =>
        value !== undefined && value !== null
          ? JSON.parse(JSON.stringify(value))
          : null;

      const surveyConnect = dto.surveyId
        ? { id: dto.surveyId }
        : dto.slug
          ? { slug: dto.slug }
          : null;

      if (!surveyConnect) {
        throw new Error('Either surveyId or slug must be provided');
      }
      const response = await this.prisma.response.upsert({
        where: {
          userId_questionId: {
            userId,
            questionId: dto.questionId,
          },
        },
        update: {
          answerText: dto.answerText ?? undefined,
          answerOption: dto.answerOption
            ? normalizeJson(dto.answerOption)
            : undefined,
          answerOptions: dto.answerOptions
            ? normalizeJson(dto.answerOptions)
            : undefined,
          rating: dto.rating ?? undefined,
          uploadUrl: dto.uploadUrl ?? undefined,
          matrixAnswer: dto.matrixAnswer !== undefined && dto.matrixAnswer !== null
            ? normalizeJson(dto.matrixAnswer)
            : undefined,
        },

        create: {
          answerText: dto.answerText,
          answerOption: normalizeJson(dto.answerOption) ?? [],
          answerOptions: normalizeJson(dto.answerOptions) ?? [],
          rating: dto.rating,
          uploadUrl: dto.uploadUrl,
          matrixAnswer: normalizeJson(dto.matrixAnswer),
          user: { connect: { id: userId } },
          survey: { connect: surveyConnect },
          question: { connect: { id: dto.questionId } },
        },
      });

      const isNew =
        response.createdAt.getTime() === response.updatedAt.getTime();

      const survey = await this.prisma.survey.findFirst({
        where: {
          OR: [
            { id: dto.surveyId },
            { slug: dto.slug }
          ]
        },
        include: {
          sections: {
            include: {
              questions: {
                select: { id: true, required: true },
              },
            },
          },
        },
      });

      if (isNew && survey) {
        await this.notificationService.create({
          userId: survey.userId,
          title: 'New Response Received',
          message: `A new response has been submitted for your survey "${survey.title}".`,
          type: 'response',
        });
      }

      // Check survey completion for respondent and auto-award survey points
      let rewardInfo: any = null;
      let isCompleted = false;

      if (survey) {
        const allQuestions = survey.sections.flatMap((s) => s.questions);
        const requiredQuestions = allQuestions.filter((q) => q.required);

        const userResponses = await this.prisma.response.findMany({
          where: {
            userId,
            surveyId: survey.id,
          },
          select: { questionId: true },
        });

        const answeredQuestionIds = new Set(userResponses.map((r) => r.questionId));

        if (requiredQuestions.length > 0) {
          isCompleted = requiredQuestions.every((q) => answeredQuestionIds.has(q.id));
        } else if (allQuestions.length > 0) {
          isCompleted = allQuestions.every((q) => answeredQuestionIds.has(q.id));
        } else {
          isCompleted = true;
        }

        if (isCompleted) {
          rewardInfo = await this.surveyPointService.awardPointsOnCompletion(userId, survey.id);
        }
      }

      return {
        message: isNew
          ? 'Response submitted successfully.'
          : 'Response updated successfully.',
        data: response,
        surveyCompleted: isCompleted,
        reward: rewardInfo,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to submit response: ' + error.message,
      );
    }
  }

  async findAll(page = 1, limit = Limit) {
    try {
      const skip = (page - 1) * limit;

      const [responses, total] = await Promise.all([
        this.prisma.response.findMany({
          skip,
          take: limit,
          include: { user: true, question: true },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.response.count(),
      ]);

      return {
        data: responses,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Failed to retrieve responses: ${error.message}`);
    }
  }
  async findAllMyResponses(userId: number, page = 1, limit = Limit) {
    try {
      const skip = (page - 1) * limit;

      const [responses, total] = await Promise.all([
        this.prisma.response.findMany({
          where: { userId },
          skip,
          take: limit,
          include: { user: true, question: true },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.response.count(),
      ]);

      return {
        data: responses,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Failed to retrieve responses: ${error.message}`);
    }
  }

  async findByQuestion(questionId: number) {
    return this.prisma.response.findMany({
      where: { questionId },
      include: { user: true },
    });
  }

  async findBySurvey(surveyId: number) {
    return this.prisma.response.findMany({
      where: {
        question: {
          section: {
            surveyId: surveyId,
          },
        },
      },
      include: {
        user: true,
        question: {
          include: {
            section: true,
          },
        },
      },
    });
  }

  async findMySurvey(surveyId: number, userId?: number) {
    try {
      const responses = await this.prisma.response.findMany({
        where: {
          question: {
            section: {
              surveyId: surveyId,
            },
          },
          ...(userId && { userId }),
        },
        include: {
          user: true,
          question: {
            include: {
              section: true,
            },
          },
        },
      });

      const message = userId
        ? `Responses for survey ${surveyId} submitted by user ${userId} fetched successfully.`
        : `All responses for survey ${surveyId} fetched successfully.`;

      return {
        status: 'success',
        message,
        data: responses,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch responses: ' + error.message,
      );
    }
  }

  async findOne(id: number) {
    const response = await this.prisma.response.findUnique({
      where: { id },
      include: { user: true, question: true },
    });

    if (!response) {
      throw new NotFoundException(`Response with ID ${id} not found`);
    }

    return response;
  }

  async update(id: number, dto: UpdateResponseDto) {
    try {
      const updated = await this.prisma.response.update({
        where: { id },
        data: {
          answerText: dto.answerText ?? undefined,
          rating: dto.rating ?? undefined,
          uploadUrl: dto.uploadUrl ?? undefined,

          // Ensure valid JSON for Prisma JSON fields
          answerOption: dto.answerOption
            ? JSON.parse(JSON.stringify(dto.answerOption))
            : undefined,

          answerOptions: dto.answerOptions
            ? JSON.parse(JSON.stringify(dto.answerOptions))
            : undefined,
          matrixAnswer: dto.matrixAnswer
            ? JSON.parse(JSON.stringify(dto.matrixAnswer))
            : undefined,
        },
      });

      return {
        message: 'Response updated successfully.',
        data: updated,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update response: ' + error.message,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.response.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete response: ${error.message}`,
      );
    }
  }
}
