import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurveyDto, UpdateSurveysDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { NotificationService } from 'src/notification/notification.service';
import { Limit } from 'src/common/utils/app';

@Injectable()
export class SurveyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) { }

  async create(createSurveyDto: CreateSurveyDto, userId: number) {
    const { questions, surveyInterestIds, ...surveyData } = createSurveyDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const slug = Array.from({ length: 12 }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');

    try {
      // 1️⃣ Create the survey
      const survey = await this.prisma.survey.create({
        data: {
          ...surveyData,
          slug: slug,
          userId,
          surveyInterests: surveyInterestIds?.length
            ? { connect: surveyInterestIds.map((id) => ({ id })) }
            : undefined,
        },
        include: {
          surveyInterests: true,
        },
      });

      // 2️⃣ Create a default section for the survey
      const section = await this.prisma.section.create({
        data: {
          title: `Section 1 for ${survey.title}`,
          description: 'Default section created with survey',
          surveyId: survey.id,
        },
      });

      // 3️⃣ Create questions under that section (if any)
      if (questions?.length) {
        await Promise.all(
          questions.map((q) =>
            this.prisma.question.create({
              data: {
                text: q.text,
                type: q.type,
                options: q.options ?? [],
                scaleMin: q.scaleMin ?? null,
                scaleMax: q.scaleMax ?? null,
                allowUpload: q.allowUpload ?? false,
                sectionId: section.id,
                userId: userId,
              },
            }),
          ),
        );
      }

      // 4️⃣ Notify interested users (if applicable)
      if (surveyInterestIds?.length) {
        const users = await this.prisma.user.findMany({
          where: {
            surveyInterest: {
              // ✅ ensure matches your User model relation name
              some: { id: { in: surveyInterestIds } },
            },
          },
          select: { id: true },
        });

        const userIds = users.map((u) => u.id);

        if (userIds.length > 0) {
          await this.notificationService.broadcast(userIds, {
            title: 'New Survey Available',
            message: `A new survey "${survey.title}" was just published in your interest area.`,
            type: 'survey',
          });
        }
      }

      // 5️⃣ Return survey with related data
      return await this.prisma.survey.findUnique({
        where: { id: survey.id },
        include: {
          surveyInterests: true,
          sections: {
            include: { questions: true },
          },
        },
      });
    } catch (error) {
      console.error('❌ Failed to create survey:', error);
      throw new InternalServerErrorException(
        `Failed to create survey: ${error.message}`,
      );
    }
  }

  // 🔹 Admin: get all surveys with pagination
  async findAll(page = 1, limit = Limit, date?: string) {
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (date) {
      whereClause.createdAt = { gte: new Date(date) };
    }
    const [surveys, total] = await Promise.all([
      this.prisma.survey.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          sections: {
            include: {
              questions: true, // ✅ nested inside sections
            },
          },
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

  async findAllByUser(userId: number, page = 1, limit = Limit, date?: string) {
    const skip = (page - 1) * limit;

    const whereClause: any = { userId };
    if (date) {
      whereClause.createdAt = { gte: new Date(date) }; // Filter by date if provided
    }

    const [surveys, total] = await Promise.all([
      this.prisma.survey.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          sections: {
            include: {
              questions: true, // ✅ nested inside sections
            },
          },
          responses: true,
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
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
  async findOne(slug: string) {
    const survey = await this.prisma.survey.findFirst({
      where: { slug },
      include: {
        sections: {
          include: {
            questions: {
              include: {
                matrix: true,
              },
            },
          },
        },
        user: {
          select: { id: true, email: true },
        },
      },
    });

    if (!survey) {
      throw new NotFoundException(`Survey with slug ${slug} not found`);
    }

    return survey;
  }

  async update(id: number, updateSurveyDto: UpdateSurveysDto) {
    try {
      const updatedSurvey = await this.prisma.survey.update({
        where: { id },
        data: updateSurveyDto,
      });
      return updatedSurvey;
    } catch (error) {
      console.error(`Failed to update survey with ID ${id}:`, error);
      throw new Error(`Could not update survey with ID ${id}`);
    }
  }

  async updateWithQuestionOld(id: number, dto: UpdateSurveyDto) {
    const { sections, surveyInterestIds, ...surveyData } = dto;

    // 1️⃣ Ensure survey exists
    const existingSurvey = await this.prisma.survey.findUnique({
      where: { id },
      include: { surveyInterests: true },
    });

    if (!existingSurvey) {
      throw new NotFoundException('Survey not found');
    }

    // 2️⃣ Update simple survey fields first
    await this.prisma.survey.update({
      where: { id },
      data: surveyData,
    });

    // 3️⃣ Update survey interests (Many-to-Many)
    if (surveyInterestIds) {
      const existingIds = existingSurvey.surveyInterests.map((i) => i.id);

      const toConnect = surveyInterestIds
        .filter((x) => !existingIds.includes(x))
        .map((id) => ({ id }));

      const toDisconnect = existingIds
        .filter((x) => !surveyInterestIds.includes(x))
        .map((id) => ({ id }));

      await this.prisma.survey.update({
        where: { id },
        data: {
          surveyInterests: {
            connect: toConnect,
            disconnect: toDisconnect,
          },
        },
      });
    }

    // 4️⃣ Handle sections + questions
    if (sections?.length) {
      for (const section of sections) {
        let sectionId = section.id;

        if (!sectionId) {
          // CREATE new section
          const created = await this.prisma.section.create({
            data: {
              surveyId: id,
              title: section.title,
              description: section.description,
              order: section.order,
            },
          });

          sectionId = created.id;
        } else {
          // UPDATE existing section
          await this.prisma.section.update({
            where: { id: sectionId },
            data: {
              title: section.title,
              description: section.description,
              order: section.order,
            },
          });
        }

        // 🔹 Handle questions inside this section
        if (section.questions?.length) {
          for (const q of section.questions) {
            if (!q.id) {
              // CREATE question
              await this.prisma.question.create({
                data: {
                  sectionId,
                  text: q.text || '',
                  type: q.type || ('TEXT' as any),
                  options: q.options ?? [],
                  required: q.required ?? false,
                  scaleMin: q.scaleMin,
                  scaleMax: q.scaleMax,
                },
              });
            } else {
              // UPDATE existing question
              await this.prisma.question.update({
                where: { id: q.id },
                data: {
                  text: q.text || '',
                  type: q.type || ('TEXT' as any),
                  options: q.options ?? [],
                  required: q.required ?? false,
                  scaleMin: q.scaleMin,
                  scaleMax: q.scaleMax,
                },
              });
            }
          }
        }
      }
    }

    // 5️⃣ Return updated survey with nested objects
    return this.prisma.survey.findUnique({
      where: { id },
      include: {
        surveyInterests: true,
        sections: {
          include: { questions: true },
        },
      },
    });
  }

  async updateWithQuestion(id: number, dto: UpdateSurveyDto) {
    const { sections, surveyInterestIds, ...surveyData } = dto;

    // 1️⃣ Ensure survey exists
    const existingSurvey = await this.prisma.survey.findUnique({
      where: { id },
      include: { surveyInterests: true },
    });

    if (!existingSurvey) throw new NotFoundException('Survey not found');

    // 2️⃣ Update survey fields
    await this.prisma.survey.update({
      where: { id },
      data: surveyData,
    });

    // 3️⃣ Update survey interests (many-to-many)
    if (surveyInterestIds) {
      const existingIds = existingSurvey.surveyInterests.map((i) => i.id);

      const toConnect = surveyInterestIds
        .filter((x) => !existingIds.includes(x))
        .map((id) => ({ id }));

      const toDisconnect = existingIds
        .filter((x) => !surveyInterestIds.includes(x))
        .map((id) => ({ id }));

      await this.prisma.survey.update({
        where: { id },
        data: {
          surveyInterests: {
            connect: toConnect,
            disconnect: toDisconnect,
          },
        },
      });
    }

    // 4️⃣ Handle sections + questions
    if (sections?.length) {
      for (const section of sections) {
        let sectionId = section.id;

        // CREATE or UPDATE section
        if (!sectionId) {
          const createdSection = await this.prisma.section.create({
            data: {
              surveyId: id,
              title: section.title,
              description: section.description,
              order: section.order,
            },
          });
          sectionId = createdSection.id;
        } else {
          await this.prisma.section.update({
            where: { id: sectionId },
            data: {
              title: section.title,
              description: section.description,
              order: section.order,
            },
          });
        }

        // CREATE or UPDATE questions
        if (section.questions?.length) {
          for (const q of section.questions) {
            const questionData = {
              sectionId,
              text: q.text || '',
              type: q.type || ('TEXT' as any),
              options: q.options ?? [],
              required: q.required ?? false,
              scaleMin: q.scaleMin,
              scaleMax: q.scaleMax,
            };

            if (q.id && q.id < 2147483647) {
              // ✅ Update existing question
              await this.prisma.question.update({
                where: { id: q.id },
                data: questionData,
              });
            } else {
              // ✅ Create new question, let Prisma generate id
              await this.prisma.question.create({
                data: questionData,
              });
            }
          }
        }
      }
    }

    // 5️⃣ Return updated survey
    return this.prisma.survey.findUnique({
      where: { id },
      include: {
        surveyInterests: true,
        sections: { include: { questions: true } },
      },
    });
  }

  async updateSection(
    surveyId: number,
    sections: { id: number; order: number }[],
  ) {
    await Promise.all(
      sections.map((s) =>
        this.prisma.section.update({
          where: { id: s.id },
          data: { order: s.order },
        }),
      ),
    );

    return this.prisma.survey.findUnique({
      where: { id: surveyId },
      include: {
        sections: { orderBy: { order: 'asc' }, include: { questions: true } },
      },
    });
  }

  async remove(id: number) {
    const survey = await this.prisma.survey.findUnique({ where: { id } });
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    // delete children first
    await this.prisma.section.deleteMany({ where: { surveyId: id } });
    await this.prisma.question.deleteMany({
      where: { section: { surveyId: id } },
    });

    // now delete survey
    return this.prisma.survey.delete({ where: { id } });
  }

  async publishSurvey(id: number, userId: number) {
    return this.prisma.$transaction(async (tx) => {
      const survey = await tx.survey.findUnique({
        where: { id },
      });

      if (!survey || survey.userId !== userId) {
        throw new HttpException('Survey not found', HttpStatus.NOT_FOUND);
      }

      const wallet = await tx.wallet.findUnique({
        where: { userId },
      });

      if (!wallet || wallet.points < 20) {
        throw new HttpException(
          'Insufficient points to publish survey',
          HttpStatus.BAD_REQUEST,
        );
      }

      await tx.wallet.update({
        where: { id: wallet.id },
        data: { points: { decrement: 20 } },
      });

      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'points_spend',
          points: 20,
          description: 'Survey published',
        },
      });

      return tx.survey.update({
        where: { id },
        data: { status: 'PUBLISHED' },
      });
    });
  }
}
