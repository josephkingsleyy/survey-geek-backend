import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { last } from 'rxjs';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) { }

  // Create a question and link it to a survey
  async create(createQuestionDto: CreateQuestionDto) {
    const { sectionId, userId, ...rest } = createQuestionDto;

    // Ensure the survey exists
    const section = await this.prisma.survey.findUnique({
      where: { id: sectionId },
    });
    if (!section) throw new NotFoundException(`Survey with ID ${sectionId} not found`);

    return this.prisma.question.create({
      data: {
        ...rest,
        section: { connect: { id: sectionId } }, // ✅ correct
        user: { connect: { id: userId } },
      },
    });
  }

  async createMany(questions: CreateQuestionDto[]) {
    if (!questions.length) return [];

    try {
      const sectionId = questions[0].sectionId;

      // ✅ Ensure the survey exists
      const survey = await this.prisma.survey.findUnique({
        where: { id: sectionId },
      });
      if (!survey) throw new NotFoundException(`Survey with ID ${sectionId} not found`);

      return this.prisma.question.createMany({
        data: questions.map(({ sectionId, ...rest }) => ({
          ...rest,
          sectionId,
        })),
      });
    } catch (error) {
      throw new Error('Error creating questions: ' + error.message);
    }

  }

  // Get all questions
  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const [questions, total] = await Promise.all([
        this.prisma.question.findMany({
          skip,
          take: limit,
          include: {
            section: {
              include: { survey: true }, // ✅ nested include
            }, responses: true
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.question.count()
      ]);
      return {
        data: questions,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };

    } catch (error) {
      throw new Error(error.message);

    }
  }

  async findAllMyQuestions(userId: number, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const [questions, total] = await Promise.all([
        this.prisma.question.findMany({
          where: { userId },
          skip,
          take: limit,
          include: {
            section: {
              include: { survey: true }, // ✅ nested include
            },
            responses: true
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.question.count({ where: { userId } })
      ]);
      return {
        data: questions,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };

    } catch (error) {
      throw new Error(error.message);

    }
  }

  // Get all questions belonging to a survey
  async findBySurvey(surveyId: number) {
    return this.prisma.question.findMany({
      where: {
        section: {
          surveyId, // ✅ filter through section relation
        },
      },
      include: {
        responses: true,
        section: {
          include: {
            survey: true, // ✅ optional: include survey info
          },
        },
      },
    });
  }


  // Get a single question
  async findOne(id: number) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        responses: true,
        section: {
          include: {
            survey: true, // ✅ access survey through section
          },
        },
      },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  // Update a question
  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
      return await this.prisma.question.update({
        where: { id },
        data: updateQuestionDto,
      });
    } catch {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }

  // Delete a question
  async remove(id: number) {
    try {
      return await this.prisma.question.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }
}
