import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSectionDto, UpdateSurveyDto } from './dto/update-survey.dto';
import { NotificationService } from 'src/notification/notification.service';
import { SurveyStatus, QuestionType } from '@prisma/client';
import { Limit } from 'src/common/utils/app';


@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) { }

  // async create(createSurveyDto: CreateSurveyDto, userId: number) {
  //   try {
  //     const { questions, surveyInterestIds, ...surveyData } = createSurveyDto;

  //     const user = await this.prisma.user.findUnique({
  //       where: { id: userId },
  //     });

  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }

  //     // if (!user.isActive) {
  //     //   throw new ForbiddenException('User is not allowed to create surveys');
  //     // }
  //     // 1. Create the survey and link to interests
  //     const survey = await this.prisma.survey.create({
  //       data: {
  //         ...surveyData,
  //         userId,
  //         questions: {
  //           create: questions?.map((q) => ({
  //             text: q.text,
  //             type: q.type,
  //             options: q.options ?? [],
  //             scaleMin: q.scaleMin,
  //             scaleMax: q.scaleMax,
  //             userId: userId,
  //           })) || [],
  //         },
  //         surveyInterests: surveyInterestIds?.length
  //           ? {
  //             connect: surveyInterestIds.map((id) => ({ id })),
  //           }
  //           : undefined,
  //       },
  //       include: {
  //         surveyInterests: true,
  //         questions: true,
  //       },
  //     });

  //     // 2. Get all users who are subscribed to ANY of the interests
  //     if (surveyInterestIds?.length) {
  //       const users = await this.prisma.user.findMany({
  //         where: {
  //           surveyInterest: {
  //             some: { id: { in: surveyInterestIds } },
  //           },
  //         },
  //         select: { id: true },
  //       });

  //       const userIds = users.map((u) => u.id);

  //       // 3. Send them a notification
  //       if (userIds.length > 0) {
  //         await this.notificationService.broadcast(userIds, {
  //           title: 'New Survey Available',
  //           message: `A new survey "${survey.title}" was just published in your interest area.`,
  //           type: 'survey',
  //         });
  //       }
  //     }

  //     return survey;
  //   } catch (error) {
  //     throw new Error(`Failed to create survey: ${error.message}`);
  //   }

  // }

  async create(createSurveyDto: CreateSurveyDto, userId: number) {
    const { questions, surveyInterestIds, ...surveyData } = createSurveyDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    try {
      // 1️⃣ Create the survey
      const survey = await this.prisma.survey.create({
        data: {
          ...surveyData,
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
            })
          )
        );
      }

      // 4️⃣ Notify interested users (if applicable)
      if (surveyInterestIds?.length) {
        const users = await this.prisma.user.findMany({
          where: {
            surveyInterest: { // ✅ ensure matches your User model relation name
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
      throw new InternalServerErrorException(`Failed to create survey: ${error.message}`);
    }
  }



  // 🔹 Admin: get all surveys with pagination
  async findAll(page = 1, limit = Limit) {
    const skip = (page - 1) * limit;

    const [surveys, total] = await Promise.all([
      this.prisma.survey.findMany({
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

  async findAllByUser(userId: number, page = 1, limit = Limit) {
    const skip = (page - 1) * limit;

    const [surveys, total] = await Promise.all([
      this.prisma.survey.findMany({
        where: { userId },
        skip,
        take: limit,
        include: {
          sections:
          {
            include: {
              questions: true, // ✅ nested inside sections
            },
          },
          responses: true,
          user: { select: { id: true, email: true } },
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
        sections: {
          include: {
            questions: {
              include: {
                responses: true,
              },
            },
          },
        },
        responses: true,
        user: {
          select: { id: true, email: true },
        },
      },
    });

    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    // Attach matrix manually if matrixId exists
    for (const section of survey.sections) {
      for (const question of section.questions) {
        if (question.matrixId) {
          const matrix = await this.prisma.matrixField.findUnique({
            where: { id: question.matrixId },
          });
          if (matrix) {
            question['matrix'] = matrix;
          }
        }
      }
    }

    return survey;
  }


  // async update(id: number, updateSurveyDto: UpdateSurveyDto) {
  //   const { surveyInterestIds, ...data } = updateSurveyDto;

  //   // if (typeof data.status === 'string') {
  //   //   data.status = { set: data.status as SurveyStatus };
  //   // }

  //   if (surveyInterestIds) {
  //     const existing = await this.prisma.survey.findUnique({
  //       where: { id },
  //       include: { surveyInterests: { select: { id: true } } },
  //     });

  //     const existingIds = existing?.surveyInterests.map((si) => si.id) || [];

  //     const toConnect = surveyInterestIds
  //       .filter((id) => !existingIds.includes(id))
  //       .map((id) => ({ id }));

  //     const toDisconnect = existingIds
  //       .filter((id) => !surveyInterestIds.includes(id))
  //       .map((id) => ({ id }));

  //     return this.prisma.survey.update({
  //       where: { id },
  //       data: {
  //         ...data,
  //         surveyInterests: {
  //           connect: toConnect,
  //           disconnect: toDisconnect,
  //         },
  //       },
  //       include: {
  //         surveyInterests: true,
  //         sections: { include: { questions: true } },
  //       },
  //     });
  //   }

  //   return this.prisma.survey.update({
  //     where: { id },
  //     data,
  //     include: {
  //       surveyInterests: true,
  //       sections: { include: { questions: true } }, // ✅ fixed include
  //     },
  //   });
  // }

  // async updateWithQuestionOld(id: number, dto: UpdateSurveyDto) {
  //   const { sections, surveyInterestIds, ...surveyData } = dto;

  //   // 1️⃣ Ensure survey exists
  //   const existingSurvey = await this.prisma.survey.findUnique({
  //     where: { id },
  //     include: { surveyInterests: true },
  //   });

  //   if (!existingSurvey) {
  //     throw new NotFoundException('Survey not found');
  //   }

  //   // 2️⃣ Update simple survey fields first
  //   await this.prisma.survey.update({
  //     where: { id },
  //     data: surveyData,
  //   });

  //   // 3️⃣ Update survey interests (Many-to-Many)
  //   if (surveyInterestIds) {
  //     const existingIds = existingSurvey.surveyInterests.map((i) => i.id);

  //     const toConnect = surveyInterestIds
  //       .filter((x) => !existingIds.includes(x))
  //       .map((id) => ({ id }));

  //     const toDisconnect = existingIds
  //       .filter((x) => !surveyInterestIds.includes(x))
  //       .map((id) => ({ id }));

  //     await this.prisma.survey.update({
  //       where: { id },
  //       data: {
  //         surveyInterests: {
  //           connect: toConnect,
  //           disconnect: toDisconnect,
  //         },
  //       },
  //     });
  //   }

  //   // 4️⃣ Handle sections + questions
  //   if (sections?.length) {
  //     for (const section of sections) {
  //       let sectionId = section.id;

  //       if (!sectionId) {
  //         // CREATE new section
  //         const created = await this.prisma.section.create({
  //           data: {
  //             surveyId: id,
  //             title: section.title,
  //             description: section.description,
  //             order: section.order,
  //           },
  //         });

  //         sectionId = created.id;
  //       } else {
  //         // UPDATE existing section
  //         await this.prisma.section.update({
  //           where: { id: sectionId },
  //           data: {
  //             title: section.title,
  //             description: section.description,
  //             order: section.order,
  //           },
  //         });
  //       }

  //       // 🔹 Handle questions inside this section
  //       if (section.questions?.length) {
  //         for (const q of section.questions) {
  //           if (!q.id) {
  //             // CREATE question
  //             await this.prisma.question.create({
  //               data: {
  //                 sectionId,
  //                 text: q.text || '',
  //                 type: q.type || "TEXT" as any,
  //                 options: q.options ?? [],
  //                 required: q.required ?? false,
  //                 scaleMin: q.scaleMin,
  //                 scaleMax: q.scaleMax,
  //               },
  //             });
  //           } else {
  //             // UPDATE existing question
  //             await this.prisma.question.update({
  //               where: { id: q.id },
  //               data: {
  //                 text: q.text || '',
  //                 type: q.type || "TEXT" as any,
  //                 options: q.options ?? [],
  //                 required: q.required ?? false,
  //                 scaleMin: q.scaleMin,
  //                 scaleMax: q.scaleMax,
  //               },
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }

  //   // 5️⃣ Return updated survey with nested objects
  //   return this.prisma.survey.findUnique({
  //     where: { id },
  //     include: {
  //       surveyInterests: true,
  //       sections: {
  //         include: { questions: true },
  //       },
  //     },
  //   });
  // }

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
              type: q.type || 'TEXT' as any,
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



  async updateSection(surveyId: number, sections: { id: number; order: number }[]) {
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


  // 🔹 Delete survey
  async remove(id: number) {
    const survey = await this.prisma.survey.findUnique({ where: { id } });
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    return this.prisma.survey.delete({ where: { id } });
  }
}
