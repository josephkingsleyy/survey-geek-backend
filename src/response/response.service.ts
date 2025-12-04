import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Injectable()
export class ResponseService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateResponseDto, userId: number) {
    try {
      return this.prisma.response.upsert({
        where: {
          userId_questionId: {
            userId,
            questionId: dto.questionId,
          },
        },
        update: {
          answerText: dto.answerText,
          answerOption: dto.answerOption,
          answerOptions: dto.answerOptions,
          rating: dto.rating,
          uploadUrl: dto.uploadUrl,
        },
        create: {
          answerText: dto.answerText,
          answerOption: dto.answerOption,
          answerOptions: dto.answerOptions,
          rating: dto.rating,
          uploadUrl: dto.uploadUrl,
          user: { connect: { id: userId } },
          survey: { connect: { id: dto.surveyId } },
          question: { connect: { id: dto.questionId } },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to submit response: ' + error.message);
    }
  }

  async findAll(page = 1, limit = 10) {
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
        lastPage: Math.ceil(total / limit)
      };

    } catch (error) {
      throw new Error(`Failed to retrieve responses: ${error.message}`);
    }
  }
  async findAllMyResponses(userId: number, page = 1, limit = 10) {
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
        lastPage: Math.ceil(total / limit)
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
    return this.prisma.response.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    try {
      return await this.prisma.response.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete response: ${error.message}`);
    }
  }
}
