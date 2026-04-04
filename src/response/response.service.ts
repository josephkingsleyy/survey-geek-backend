import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { NotificationService } from 'src/notification/notification.service';
import { Limit } from 'src/common/utils/app';

@Injectable()
export class ResponseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(dto: CreateResponseDto, userId: number) {
    try {
      const normalize = (value: any) =>
        value ? JSON.parse(JSON.stringify(value)) : [];

      const response = await this.prisma.response.upsert({
        where: {
          userId_questionId: {
            userId,
            questionId: dto.questionId,
          },
        },
        update: {
          answerText: dto.answerText,
          answerOption: dto.answerOption
            ? JSON.parse(JSON.stringify(dto.answerOption))
            : [],
          answerOptions: dto.answerOptions
            ? JSON.parse(JSON.stringify(dto.answerOptions))
            : [],
          rating: dto.rating,
          uploadUrl: dto.uploadUrl,
          matrixAnswer: dto.matrixAnswer
            ? JSON.parse(JSON.stringify(dto.matrixAnswer))
            : [],
        },
        create: {
          answerText: dto.answerText,
          answerOption: normalize(dto.answerOption),
          answerOptions: normalize(dto.answerOptions),
          rating: dto.rating,
          uploadUrl: dto.uploadUrl,
          matrixAnswer: normalize(dto.matrixAnswer),
          user: { connect: { id: userId } },
          survey: { connect: { id: dto.surveyId } },
          question: { connect: { id: dto.questionId } },
        },
      });

      const isNew =
        response.createdAt.getTime() === response.updatedAt.getTime();

      if (isNew) {
        const survey = await this.prisma.survey.findUnique({
          where: { id: dto.surveyId },
          select: { userId: true, title: true },
        });

        if (survey) {
          await this.notificationService.create({
            userId: survey.userId,
            title: 'New Response Received',
            message: `A new response has been submitted for your survey "${survey.title}".`,
            type: 'response',
          });
        }
      }

      return {
        message: isNew
          ? 'Response submitted successfully.'
          : 'Response updated successfully.',
        data: response,
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
