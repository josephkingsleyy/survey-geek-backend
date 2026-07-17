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
import { PricingService } from './pricing.service';
import { buildInvoiceEmail, buildInvoiceLineItems } from './invoice-email.template';

@Injectable()
export class SurveyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly pricingService: PricingService,
  ) { }

  private async validateAndProcessAudienceAndInterests(
    dto: any
  ) {
    if (dto.targetAudience === 'specific') {
      // Specific audience:
      // - Clear interests
      dto.surveyInterestIds = [];

      // - Validate that audienceOccupation, audienceState, timeline, modeOfCollection, questionNumber are present
      if (!dto.audienceOccupation || (Array.isArray(dto.audienceOccupation) && dto.audienceOccupation.length === 0) || dto.audienceOccupation === "") {
        throw new BadRequestException('Occupation is required for specific audience');
      }
      if (!dto.audienceState || (Array.isArray(dto.audienceState) && dto.audienceState.length === 0) || dto.audienceState === "") {
        throw new BadRequestException('State is required for specific audience');
      }
      if (!dto.timeline) {
        throw new BadRequestException('Timeline is required for specific audience');
      }
      if (!dto.modeOfCollection) {
        throw new BadRequestException('Mode of collection is required for specific audience');
      }
      if (!dto.questionNumber) {
        throw new BadRequestException('Question count is required for specific audience');
      }
    } else {
      // General audience (or general is default)
      // - Validate that we have at least one interest and at most 3
      if (!dto.surveyInterestIds || !Array.isArray(dto.surveyInterestIds) || dto.surveyInterestIds.length === 0) {
        throw new BadRequestException('At least one interest is required for a general audience survey');
      }
      if (dto.surveyInterestIds.length > 3) {
        throw new BadRequestException('Maximum of 3 interests allowed');
      }

      // - Clear target specific fields
      dto.audienceOccupation = null;
      dto.audienceState = null;
      dto.timeline = null;
      dto.modeOfCollection = null;
      dto.questionNumber = null;
      dto.support = null;
    }
  }

  async create(createSurveyDto: CreateSurveyDto, userId: number) {
    await this.validateAndProcessAudienceAndInterests(createSurveyDto);
    const { questions, surveyInterestIds, audienceOccupation, audienceState, ...surveyData } = createSurveyDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const slug = Array.from({ length: 12 }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');

    // 🔍 Debug: log the raw pricing fields so you can verify they match config keys
    // console.log('[PricingDebug]', {
    //   targetAudience: createSurveyDto.targetAudience,
    //   minResponse: createSurveyDto.minResponse,
    //   timeline: createSurveyDto.timeline,
    //   modeOfCollection: createSurveyDto.modeOfCollection,
    //   questionNumber: createSurveyDto.questionNumber,
    //   support: createSurveyDto.support,
    // });
    const calculatedPrice = this.pricingService.calculatePrice(createSurveyDto);

    // ── Transaction: only fast DB writes in here ─────────────────────────────
    const result = await this.prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({ where: { userId } });
      if (!wallet) throw new NotFoundException('Wallet not found');
      if (wallet.balance < calculatedPrice) throw new BadRequestException('Insufficient points');

      await tx.wallet.update({
        where: { userId },
        data: { balance: { decrement: calculatedPrice } },
      });

      const survey = await tx.survey.create({
        data: {
          ...surveyData,
          slug,
          userId,
          price: calculatedPrice,
          audienceOccupation: audienceOccupation ? JSON.stringify(audienceOccupation) : null,
          audienceState: audienceState ? JSON.stringify(audienceState) : null,
          surveyInterests: surveyInterestIds?.length
            ? { connect: surveyInterestIds.map((id) => ({ id })) }
            : undefined,
        },
        include: { surveyInterests: true },
      });

      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          amount: -calculatedPrice,
          type: 'debit',
          description: `Survey creation with id:${survey.id} and title: ${survey.title}, ${calculatedPrice}`,
        },
      });

      const section = await tx.section.create({
        data: {
          title: `Section 1 for ${survey.title}`,
          description: 'Default section created with survey',
          surveyId: survey.id,
          order: 1,
        },
      });

      if (questions?.length) {
        await Promise.all(
          questions.map((q) =>
            tx.question.create({
              data: {
                text: q.text,
                type: q.type,
                options: q.options ?? [],
                scaleMin: q.scaleMin ?? null,
                scaleMax: q.scaleMax ?? null,
                allowUpload: q.allowUpload ?? false,
                allowTime: q.allowTime ?? false,
                allowedRange: q.allowedRange ?? null,
                timeFormat: q.timeFormat ?? '24_HOUR',
                levels: q.levels ?? 5,
                symbol: q.symbol ?? 'star',
                statements: q.statements ?? [],
                required: q.required ?? false,
                description: q.description ?? null,
                maxFiles: q.maxFiles ?? 1,
                maxSize: q.maxSize ?? 2048,
                uploadedFiles: q.uploadedFiles ?? [],
                order: q.order ?? 1,
                branchCondition: q.branchCondition ?? null,
                sectionId: section.id,
                userId,
              },
            }),
          ),
        );
      }

      return {
        ...survey,
        sections: [{ ...section, questions: questions ?? [] }],
      };
    }, {
      timeout: 15000,
      maxWait: 5000
    }).catch((error) => {
      console.error('❌ Failed to create survey:', error);
      throw new InternalServerErrorException(`Failed to create survey: ${error.message}`);
    });

    if (!result) throw new NotFoundException('Survey not found after creation');

    // ── Side-effects: run after transaction commits, don't block the response ─
    // Fire-and-forget — failures here won't roll back the survey

    const lineItems = buildInvoiceLineItems(createSurveyDto);
    const htmlBody = buildInvoiceEmail({
      surveyTitle: result?.title ?? "untitle survey",
      surveyId: result?.id,
      userEmail: user?.email,
      lineItems,
      total: calculatedPrice,
    });
    sendEmail({
      to: user.email,
      subject: `Invoice – ${result.title} (${calculatedPrice.toLocaleString()} pts deducted)`,
      text: `Your survey "${result.title}" was created successfully. Your wallet was debited ${calculatedPrice} points.`,
      html: htmlBody,
    }).catch((err) => console.error('❌ Email failed:', err));

    this.notificationService.create({
      title: 'Debit Notification',
      message: `Your survey "${result.title}" was created successfully. Your wallet was debited ${calculatedPrice} points.`,
      userId,
      type: 'debit',
    }).catch((err) => console.error('❌ Notification failed:', err));

    return result;
  }

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
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      baseWhere.createdAt = {
        gte: startDate,
        lte: endDate,
      };
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
            orderBy: { order: 'asc' },
            include: {
              questions: {
                orderBy: { order: 'asc' },
              },
            },
          },
          responses: true,
          user: { select: { id: true, email: true, firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.survey.count(),

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
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      baseWhere.createdAt = {
        gte: startDate,
        lte: endDate,
      };
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
            orderBy: { order: 'asc' },
            include: {
              questions: {
                orderBy: { order: 'asc' },
              },
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
              orderBy: { order: 'asc' },
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
  // survey.service.ts

  async getSurveyCounts(user: any) {

    // Admin sees everything
    const whereClause =
      user.role === 'Admin'
        ? {}
        : {
          userId: user?.userId || user?.sub,
        };

    const statusCounts = await this.prisma.survey.groupBy({
      by: ['status'],
      where: whereClause,
      _count: {
        status: true,
      },
    });

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

    const total = Object.values(countMap).reduce(
      (acc, curr) => acc + curr,
      0,
    );

    return {
      total,
      ...countMap,
    };
  }


  async getDistinctOccupationAndStates() {
    const users = await this.prisma.user.findMany({
      where: {
        hasOnboarded: true,
        stateOfResidence: { not: null },
        occupation: { not: null },
      },
      select: {
        stateOfResidence: true,
        occupation: true,
      },
    });

    const stateSet = new Set<string>();
    const occupationSet = new Set<string>();

    for (const user of users) {
      const state = user.stateOfResidence?.toLowerCase().trim();
      const occupation = user.occupation?.toLowerCase().trim();

      if (state) stateSet.add(state);
      if (occupation) occupationSet.add(occupation);
    }

    return {
      states: Array.from(stateSet),
      occupations: Array.from(occupationSet),
    };
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
    await this.validateAndProcessAudienceAndInterests(updateSurveyDto);
    const { sections, audienceOccupation, audienceState, surveyInterestIds, maxResponse, price, ...surveyData } = updateSurveyDto;
    try {
      const existingSurvey = await this.prisma.survey.findUnique({
        where: isNaN(Number(id)) ? { slug: id } : { id: Number(id) },
        include: { surveyInterests: true },
      });
      if (!existingSurvey) throw new NotFoundException('Survey not found');

      const updatedSurvey = await this.prisma.survey.update({
        where: { id: existingSurvey.id },
        data: {
          ...surveyData,
          audienceOccupation: audienceOccupation ? JSON.stringify(audienceOccupation) : null,
          audienceState: audienceState ? JSON.stringify(audienceState) : null,
          price: price !== undefined ? parseFloat(price as string) : undefined,
        },
        include: {
          user: true,
          surveyInterests: true,
        }
      });

      if (surveyInterestIds) {
        const existingIds = existingSurvey.surveyInterests.map((i) => i.id);
        const toConnect = surveyInterestIds.filter((x) => !existingIds.includes(x)).map((id) => ({ id }));
        const toDisconnect = existingIds.filter((x) => !surveyInterestIds.includes(x)).map((id) => ({ id }));
        const reUpdatedSurvey = await this.prisma.survey.update({
          where: { id: existingSurvey.id },
          data: {
            surveyInterests: {
              connect: toConnect,
              disconnect: toDisconnect,
            },
          },
          include: {
            user: true,
            surveyInterests: true,
          }
        });
        Object.assign(updatedSurvey, reUpdatedSurvey);
      }
      if (updateSurveyDto.status === "PUBLISHED") {
        if (updatedSurvey?.user?.email) {
          await sendEmail({
            to: updatedSurvey.user.email,
            subject: 'Survey Published',
            text: `Your survey "${updatedSurvey.title}" has been approved and published.`,
          });
        }

        let userIds: number[] = [];

        if (updatedSurvey.targetAudience === 'specific') {
          // Specific Audience: matches occupation and stateOfResidence
          let targetedStates: string[] = [];
          let targetedOccupations: string[] = [];

          try {
            if (updatedSurvey.audienceState) {
              const parsed = JSON.parse(updatedSurvey.audienceState);
              targetedStates = Array.isArray(parsed) ? parsed.map(s => s.toLowerCase().trim()) : [parsed.toLowerCase().trim()];
            }
          } catch {
            if (updatedSurvey.audienceState) {
              targetedStates = [updatedSurvey.audienceState.toLowerCase().trim()];
            }
          }

          try {
            if (updatedSurvey.audienceOccupation) {
              const parsed = JSON.parse(updatedSurvey.audienceOccupation);
              targetedOccupations = Array.isArray(parsed) ? parsed.map(o => o.toLowerCase().trim()) : [parsed.toLowerCase().trim()];
            }
          } catch {
            if (updatedSurvey.audienceOccupation) {
              targetedOccupations = [updatedSurvey.audienceOccupation.toLowerCase().trim()];
            }
          }

          const allUsers = await this.prisma.user.findMany({
            select: {
              id: true,
              stateOfResidence: true,
              occupation: true,
            }
          });

          userIds = allUsers.filter(u => {
            const userState = u.stateOfResidence?.toLowerCase().trim();
            const userOcc = u.occupation?.toLowerCase().trim();

            const stateMatches = targetedStates.length === 0 || (userState && targetedStates.includes(userState));
            const occMatches = targetedOccupations.length === 0 || (userOcc && targetedOccupations.includes(userOcc));

            return stateMatches && occMatches;
          }).map(u => u.id);

        } else {
          // General Audience: matches users whose profile interests include any of the survey's selected interests
          const interestIds = updatedSurvey.surveyInterests.map(i => i.id);

          const users = await this.prisma.user.findMany({
            where: {
              surveyInterest: {
                some: {
                  id: { in: interestIds }
                }
              }
            },
            select: { id: true }
          });
          userIds = users.map((u) => u.id);
        }

        if (userIds.length > 0) {
          await this.notificationService.broadcast(userIds, {
            title: 'New Survey Available',
            message: `A new survey "${updatedSurvey.title}" was just published.`,
            type: 'survey',
          });
        }
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
    await this.validateAndProcessAudienceAndInterests(dto);
    const { sections, surveyInterestIds, audienceOccupation, audienceState, maxResponse, price, ...surveyData } = dto;

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
      data: {
        ...surveyData,
        audienceOccupation: audienceOccupation ? JSON.stringify(audienceOccupation) : null,
        audienceState: audienceState ? JSON.stringify(audienceState) : null,
        price: price !== undefined ? parseFloat(price as string) : undefined,
      },
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
                  allowTime: q.allowTime ?? false,
                  allowedRange: q.allowedRange ?? null,
                  timeFormat: q.timeFormat ?? '24_HOUR',
                  levels: q.levels ?? 5,
                  symbol: q.symbol ?? 'star',
                  statements: q.statements ?? [],
                  description: q.description ?? null,
                  maxFiles: q.maxFiles ?? 1,
                  maxSize: q.maxSize ?? 2048,
                  uploadedFiles: q.uploadedFiles ?? [],
                  order: q.order ?? 1,
                  branchCondition: q.branchCondition ?? null,
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
                  allowTime: q.allowTime ?? false,
                  allowedRange: q.allowedRange ?? null,
                  timeFormat: q.timeFormat ?? '24_HOUR',
                  levels: q.levels ?? 5,
                  symbol: q.symbol ?? 'star',
                  statements: q.statements ?? [],
                  description: q.description ?? null,
                  maxFiles: q.maxFiles ?? 1,
                  maxSize: q.maxSize ?? 2048,
                  uploadedFiles: q.uploadedFiles ?? [],
                  order: q.order ?? 1,
                  branchCondition: q.branchCondition ?? null,
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
    await this.validateAndProcessAudienceAndInterests(dto);
    const { sections, surveyInterestIds, audienceOccupation, audienceState, maxResponse, price, ...surveyData } = dto;

    // 1️⃣ Ensure survey exists
    const existingSurvey = await this.prisma.survey.findUnique({
      where: { id },
      include: { surveyInterests: true },
    });

    if (!existingSurvey) throw new NotFoundException('Survey not found');

    // 2️⃣ Update survey fields
    await this.prisma.survey.update({
      where: { id },
      data: {
        ...surveyData,
        audienceOccupation: audienceOccupation ? JSON.stringify(audienceOccupation) : null,
        audienceState: audienceState ? JSON.stringify(audienceState) : null,
        price: price !== undefined ? parseFloat(price as string) : undefined,
      },
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
        sections: {
          orderBy: { order: 'asc' },
          include: {
            questions: {
              orderBy: { order: 'asc' },
            },
          },
        },
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
        sections: {
          orderBy: { order: 'asc' },
          include: {
            questions: {
              orderBy: { order: 'asc' },
            },
          },
        },
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
