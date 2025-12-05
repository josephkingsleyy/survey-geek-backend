import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { last } from 'rxjs';
import { Limit } from 'src/common/utils/app';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) { }

  // Create a question and link it to a survey
  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    const { sectionId, ...rest } = createQuestionDto;

    // Ensure the survey exists
    const section = await this.prisma.survey.findUnique({
      where: { id: sectionId },
    });
    if (!section) throw new NotFoundException(`Survey with ID ${sectionId} not found`);

    return this.prisma.question.create({
      data: {
        ...rest as any,
        section: { connect: { id: sectionId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async createMany(questions: CreateQuestionDto[], userId: number) {
    if (!questions.length) return [];

    try {
      const sectionId = questions[0].sectionId;

      // ✅ Ensure the survey exists
      const survey = await this.prisma.survey.findUnique({
        where: { id: sectionId },
      });
      if (!survey) throw new NotFoundException(`Survey with ID ${sectionId} not found`);

      return this.prisma.question.createMany({
        data: (questions as any).map(({ sectionId, ...rest }) => ({
          ...rest,
          sectionId,
          user: { connect: { id: userId } },
        })),
      });
    } catch (error) {
      throw new Error('Error creating questions: ' + error.message);
    }

  }

  // Get all questions
  async findAll(page = 1, limit = Limit) {
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

  async findAllMyQuestions(userId: number, page = 1, limit = Limit) {
    try {
      const skip = (page - 1) * limit;
      const [questions, total] = await Promise.all([
        this.prisma.question.findMany({
          where: { userId },
          skip,
          take: limit,
          include: {
            section: {
              include: {
                survey: true,
              },
            },
            responses: true
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.question.count({ where: { userId } })
      ]);

      for (const q of questions) {
        if (q.matrixId) {
          const matrixIdInt = typeof q.matrixId === 'string' ? parseInt(q.matrixId, 10) : q.matrixId;

          const matrix = await this.prisma.matrixField.findUnique({
            where: { id: matrixIdInt },
          });

          if (matrix) {
            q['matrix'] = matrix; // attach matrix to question
          }
        }
      }
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

  async update(id: number, dto: UpdateQuestionDto) {
    const { matrix, ...rest } = dto;

    const question = await this.prisma.question.update({
      where: { id },
      data: rest as any,
      include: {
        matrix: true,
      },
    });

    // If no matrix sent → return
    if (!matrix) return question;

    // CASE 1 — Matrix exists → update it
    if (question.matrix) {
      await this.prisma.matrixField.update({
        where: { id: question.matrix.id },
        data: matrix,
      });

      return this.prisma.question.findUnique({
        where: { id },
        include: { matrix: true },
      });
    }

    // CASE 2 — No matrix exists → create one
    const createdMatrix = await this.prisma.matrixField.create({
      data: {
        ...matrix,
        question: { connect: { id } },
      },
    });

    return this.prisma.question.findUnique({
      where: { id },
      include: { matrix: true },
    });
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
