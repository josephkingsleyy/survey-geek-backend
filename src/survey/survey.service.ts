import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { NotificationService } from 'src/notification/notification.service';
import { Limit } from 'src/common/utils/app';
import { sendEmail } from 'src/common/utils/mail-service';
import { SurveyStatus } from '@prisma/client';

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
          order: 1,
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
  async findAll(
    page = 1,
    limit = Limit,
    filters: {
      date?: string;
      status?: string;
      search?: string;
      category?: string;
      published?: any;
      completed?: any;
      trash?: any;
      pending?: any;
      draft?: any;
    } = {},
  ) {
    const skip = (page - 1) * limit;
    const {
      date,
      status,
      search,
      category,
      published,
      completed,
      trash,
      pending,
      draft,
    } = filters;

    const baseWhere: any = {};

    if (date) {
      baseWhere.createdAt = { gte: new Date(date) };
    }

    if (search) {
      baseWhere.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      baseWhere.surveyInterests = {
        some: {
          name: { contains: category, mode: 'insensitive' },
        },
      };
    }

    const whereClause = { ...baseWhere };

    if (status) {
      whereClause.status = status;
    } else if (published === 'true' || published === true) {
      whereClause.status = SurveyStatus.PUBLISHED;
    } else if (completed === 'true' || completed === true) {
      whereClause.status = SurveyStatus.COMPLETED;
    } else if (trash === 'true' || trash === true) {
      whereClause.status = SurveyStatus.TRASH;
    } else if (pending === 'true' || pending === true) {
      whereClause.status = SurveyStatus.PENDING;
    } else if (draft === 'true' || draft === true) {
      whereClause.status = SurveyStatus.DRAFT;
    }


    const [surveys, total, statusCounts] = await Promise.all([
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
      this.prisma.survey.count({
        where: whereClause,
      }),

      this.prisma.survey.groupBy({
        by: ['status'],
        where: baseWhere,
        _count: {
          status: true,
        },
      }),
    ]);


    const countMap = {
      draftCount: 0,
      publishedCount: 0,
      pausedCount: 0,
      completedCount: 0,
      pendingCount: 0,
      trashedCount: 0,
    };

    const statusKeyMap = {
      DRAFT: 'draftCount',
      PUBLISHED: 'publishedCount',
      PAUSED: 'pausedCount',
      COMPLETED: 'completedCount',
      PENDING: 'pendingCount',
      TRASH: 'trashedCount',
    };

    statusCounts.forEach((item) => {
      const key = statusKeyMap[item.status];
      if (key) {
        countMap[key] = item._count.status;
      }
    });

    return {
      data: surveys,
      total,
      page,
      lastPage: Math.ceil(total / limit),
      count: countMap,
    };
  }

  async findAllByUser(
    userId: number,
    page = 1,
    limit = Limit,
    filters: {
      date?: string;
      status?: string;
      search?: string;
      category?: string;
      published?: any;
      completed?: any;
      trash?: any;
      pending?: any;
      draft?: any;
    } = {},
  ) {
    const skip = (page - 1) * limit;
    const {
      date,
      status,
      search,
      category,
      published,
      completed,
      trash,
      pending,
      draft,
    } = filters;

    const baseWhere: any = { userId };

    if (date) {
      baseWhere.createdAt = { gte: new Date(date) };
    }

    if (search) {
      baseWhere.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      baseWhere.surveyInterests = {
        some: {
          name: { contains: category, mode: 'insensitive' },
        },
      };
    }

    const whereClause = { ...baseWhere };

    if (status) {
      whereClause.status = status;
    } else {
      if (published === 'true' || published === true)
        whereClause.status = SurveyStatus.PUBLISHED;
      if (completed === 'true' || completed === true)
        whereClause.status = SurveyStatus.COMPLETED;
      if (trash === 'true' || trash === true) whereClause.status = SurveyStatus.TRASH;
      if (pending === 'true' || pending === true)
        whereClause.status = SurveyStatus.PENDING;
      if (draft === 'true' || draft === true) whereClause.status = 'DRAFT';
    }

    const [surveys, total, statusCounts] = await Promise.all([
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
      this.prisma.survey.count({ where: whereClause }),

      this.prisma.survey.groupBy({
        by: ['status'],
        where: baseWhere,
        _count: {
          status: true,
        },
      }),
    ]);

    const countMap = {
      draftCount: 0,
      publishedCount: 0,
      pausedCount: 0,
      completedCount: 0,
      pendingCount: 0,
      trashedCount: 0,
    };

    const statusKeyMap = {
      DRAFT: 'draftCount',
      PUBLISHED: 'publishedCount',
      PAUSED: 'pausedCount',
      COMPLETED: 'completedCount',
      PENDING: 'pendingCount',
      TRASH: 'trashedCount',
    };

    statusCounts.forEach((item) => {
      const key = statusKeyMap[item.status];
      if (key) {
        countMap[key] = item._count.status;
      }
    });

    return {
      data: surveys,
      total,
      page,
      lastPage: Math.ceil(total / limit),
      count: countMap,
    };
  }

  // 🔹 Get one survey
  async findOne(slug: string) {
    const survey = await this.prisma.survey.findFirst({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
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

  // 🔹 Get full survey details for dashboard
  async getSurveyDetails(slug: string) {
    const survey = await this.prisma.survey.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
            email: true,
          },
        },
        surveyInterests: {
          select: { id: true, name: true },
        },
        sections: {
          orderBy: { order: 'asc' },
          include: {
            questions: {
              orderBy: { order: 'asc' },
              include: {
                matrix: true,
              },
            },
          },
        },
        responses: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, profilePhoto: true },
            },
          },
        },
      },
    });

    if (!survey) {
      throw new NotFoundException(`Survey with slug ${slug} not found`);
    }

    const totalQuestions = survey.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0,
    );

    const respondentsMap = new Map();
    survey.responses.forEach((resp) => {
      if (!respondentsMap.has(resp.userId)) {
        respondentsMap.set(resp.userId, {
          userId: resp.userId,
          name: `${resp.user?.firstName || ''} ${resp.user?.lastName || ''}`.trim() || 'Anonymous',
          profilePhoto: resp.user?.profilePhoto,
          responseCount: 0,
          lastResponseDate: resp.updatedAt,
        });
      }
      respondentsMap.get(resp.userId).responseCount++;
      if (resp.updatedAt > respondentsMap.get(resp.userId).lastResponseDate) {
        respondentsMap.get(resp.userId).lastResponseDate = resp.updatedAt;
      }
    });

    const respondents = Array.from(respondentsMap.values()).map((r, index) => ({
      sn: index + 1,
      name: r.name,
      progress: totalQuestions > 0 ? Math.min(100, Math.round((r.responseCount / totalQuestions) * 100)) : 0,
      profilePhoto: r.profilePhoto,
      lastActive: r.lastResponseDate,
    }));

    const otherSurveys = await this.prisma.survey.findMany({
      where: {
        userId: survey.userId,
        id: { not: survey.id },
      },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        createdAt: true,
      },
    });

    const attachments = survey.responses
      .filter(r => r.uploadUrl)
      .map(r => ({
        id: r.id,
        url: r.uploadUrl,
        name: r?.uploadUrl?.split('/').pop(),
        uploadedBy: `${r?.user?.firstName || ''} ${r?.user?.lastName || ''}`.trim(),
        date: r.createdAt
      }));

    const activities: any = [];

    // Created activity
    activities.push({
      title: survey.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subtitle: `Created on ${survey.createdAt.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}`,
      textcolor: 'primary',
      boldtext: false,
      line: true,
    });

    if (survey.status === 'PUBLISHED') {
      activities.push({
        title: survey.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        subtitle: `Approved and published on ${survey.updatedAt.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}`,
        textcolor: 'warning',
        boldtext: true,
        line: true,
      });
    }

    if (respondents.length > 0) {
      activities.push({
        title: 'Recent',
        subtitle: `${respondents.length}/${survey.minResponse || 100} responses received`,
        textcolor: 'secondary',
        boldtext: true,
        line: false,
      });
    }

    return {
      ...survey,
      stats: {
        totalResponses: respondents.length,
        attachmentsCount: attachments.length,
        completionRate: respondents.length > 0 ? Math.round(respondents.reduce((acc, r) => acc + r.progress, 0) / respondents.length) : 0,
      },
      respondents,
      attachments,
      otherSurveys,
      activities,
    };
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto) {
    const { sections, ...surveyData } = updateSurveyDto;
    try {
      const updatedSurvey = await this.prisma.survey.update({
        where: isNaN(Number(id)) ? { slug: id } : { id: Number(id) },
        data: surveyData as any,
        include: {
          user: true,
        }
      });
      if (updateSurveyDto.status === "PUBLISHED") {
        if (updatedSurvey?.user?.email) {
          await sendEmail({
            to: updatedSurvey.user.email,
            subject: 'Survey Published',
            text: `Your survey "${updatedSurvey.title}" has been approved and published.`,
          });
        }
        const users = await this.prisma.user.findMany({
          select: { id: true },
        });
        const userIds = users.map((u) => u.id);

        await this.notificationService.broadcast(userIds, {
          title: 'New Survey Available',
          message: `A new survey "${updatedSurvey.title}" was just published.`,
          type: 'survey',
        });
      };

      if (updateSurveyDto.status === "PENDING") {
        const admins = await this.prisma.user.findMany({
          where: { role: 'Admin' },
          select: { id: true, email: true },
        });

        const adminIds = admins.map((a) => a.id);

        // 🔔 Send in-app notification
        if (adminIds.length) {
          await this.notificationService.broadcast(adminIds, {
            title: 'Survey Pending Approval',
            message: `A survey "${updatedSurvey.title}" is awaiting approval.`,
            type: 'survey',
          });
        }

        // 📧 Send email to admins
        await Promise.all(
          admins
            .filter((a) => a.email)
            .map((admin) =>
              sendEmail({
                to: admin.email!,
                subject: 'Survey Pending Approval',
                text: `A survey "${updatedSurvey.title}" has been submitted and is awaiting your approval.`,
              })
            )
        );
      }
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

  async softDelete(id: number) {
    const survey = await this.prisma.survey.findUnique({ where: { id } });
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    if (survey.status === SurveyStatus.PUBLISHED) {
      throw new BadRequestException(
        'Published surveys cannot be moved to trash',
      );
    }

    if (survey.status == SurveyStatus.TRASH) {
      return this.prisma.survey.update({
        where: { id },
        data: { status: 'DRAFT', updatedAt: new Date() },
      });
    } else {
      return this.prisma.survey.update({
        where: { id },
        data: { status: 'TRASH', updatedAt: new Date() },
      });
    }
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
