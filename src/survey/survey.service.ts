import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSurveyDto: CreateSurveyDto, userId: number) {
    const { questions, ...surveyData } = createSurveyDto;

    return this.prisma.survey.create({
      data: {
        ...surveyData,
        userId,
        questions: questions
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
      },
    });
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

  // 🔹 Update survey
  async update(id: number, updateSurveyDto: UpdateSurveyDto) {
    const survey = await this.prisma.survey.findUnique({ where: { id } });

    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    return this.prisma.survey.update({
      where: { id },
      data: updateSurveyDto,
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
