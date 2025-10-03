import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) { }

  async create(createSurveyDto: CreateSurveyDto, userId: number) {
    try {
      const { questions, surveyInterestIds, ...surveyData } = createSurveyDto;

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // if (!user.isActive) {
      //   throw new ForbiddenException('User is not allowed to create surveys');
      // }
      // 1. Create the survey and link to interests
      const survey = await this.prisma.survey.create({
        data: {
          ...surveyData,
          userId,
          questions: questions?.length
            ? {
              create: questions.map((q) => ({
                text: q.text,
                type: q.type,
                options: q.options ?? [],
                scaleMin: q.scaleMin,
                scaleMax: q.scaleMax,
              })),
            }
            : undefined,
          surveyInterests: surveyInterestIds?.length
            ? {
              connect: surveyInterestIds.map((id) => ({ id })),
            }
            : undefined,
        },
        include: {
          surveyInterests: true,
          questions: true,
        },
      });

      // 2. Get all users who are subscribed to ANY of the interests
      if (surveyInterestIds?.length) {
        const users = await this.prisma.user.findMany({
          where: {
            surveyInterest: {
              some: { id: { in: surveyInterestIds } },
            },
          },
          select: { id: true },
        });

        const userIds = users.map((u) => u.id);

        // 3. Send them a notification
        if (userIds.length > 0) {
          await this.notificationService.broadcast(userIds, {
            title: 'New Survey Available',
            message: `A new survey "${survey.title}" was just published in your interest area.`,
            type: 'survey',
          });
        }
      }

      return survey;
    } catch (error) {
      throw new Error(`Failed to create survey: ${error.message}`);
    }

  }


  // 🔹 Admin: get all surveys with pagination
  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [surveys, total] = await Promise.all([
      this.prisma.survey.findMany({
        skip,
        take: limit,
        include: {
          questions: true,
          responses: true,
          user: { select: { id: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.survey.count(),
    ]);

    return {
      data: surveys,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findAllByUser(userId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [surveys, total] = await Promise.all([
      this.prisma.survey.findMany({
        where: { userId },
        skip,
        take: limit,
        include: {
          questions: true,
          responses: true,
          surveyInterests: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.survey.count({ where: { userId } }),
    ]);

    return {
      data: surveys,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  // 🔹 Get one survey
  async findOne(id: number) {
    const survey = await this.prisma.survey.findUnique({
      where: { id },
      include: {
        questions: true,
        responses: true,
      },
    });

    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    return survey;
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto) {
    const { surveyInterestIds, ...data } = updateSurveyDto;

    if (surveyInterestIds) {
      const existing = await this.prisma.survey.findUnique({
        where: { id },
        include: { surveyInterests: { select: { id: true } } },
      });

      const existingIds = existing.surveyInterests.map((si) => si.id);

      const toConnect = surveyInterestIds
        .filter((id) => !existingIds.includes(id))
        .map((id) => ({ id }));

      const toDisconnect = existingIds
        .filter((id) => !surveyInterestIds.includes(id))
        .map((id) => ({ id }));

      return this.prisma.survey.update({
        where: { id },
        data: {
          ...data,
          surveyInterests: {
            connect: toConnect,
            disconnect: toDisconnect,
          },
        },
        include: { surveyInterests: true },
      });
    }

    return this.prisma.survey.update({
      where: { id },
      data,
      include: {
        surveyInterests: true,
        questions: true,
      },
    });
  }

  // 🔹 Delete survey
  async remove(id: number) {
    const survey = await this.prisma.survey.findUnique({ where: { id } });
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    return this.prisma.survey.delete({ where: { id } });
  }
}
