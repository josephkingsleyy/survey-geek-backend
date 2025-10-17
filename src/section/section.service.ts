import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) { }

  // 🟢 Create a new section
  async create(createSectionDto: CreateSectionDto) {
    const { surveyId, title, description, order } = createSectionDto;

    // Ensure survey exists
    const survey = await this.prisma.survey.findUnique({
      where: { id: surveyId },
    });
    if (!survey) throw new NotFoundException('Survey not found');

    const section = await this.prisma.section.create({
      data: {
        title,
        description,
        order,
        surveyId,
      },
      include: { survey: true },
    });

    return section;
  }

  // 🔹 Get all sections (with pagination + optional survey filter)
  async findAll(page = 1, limit = 10, surveyId?: number) {
    const skip = (page - 1) * limit;

    const where = surveyId ? { surveyId } : {};

    const [sections, total] = await Promise.all([
      this.prisma.section.findMany({
        where,
        skip,
        take: limit,
        include: {
          survey: { select: { id: true, title: true } },
          questions: true,
        },
        orderBy: { order: 'asc' },
      }),
      this.prisma.section.count({ where }),
    ]);

    return {
      data: sections,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  // 🔹 Get one section (with questions)
  async findOne(id: number) {
    const section = await this.prisma.section.findUnique({
      where: { id },
      include: {
        survey: { select: { id: true, title: true } },
        questions: true,
      },
    });

    if (!section) throw new NotFoundException(`Section with ID ${id} not found`);
    return section;
  }

  // 🟡 Update a section
  async update(id: number, updateSectionDto: UpdateSectionDto) {
    const section = await this.prisma.section.findUnique({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');

    const updated = await this.prisma.section.update({
      where: { id },
      data: updateSectionDto,
      include: {
        survey: true,
        questions: true,
      },
    });

    return updated;
  }

  // 🔴 Delete a section (and optionally cascade)
  async remove(id: number) {
    const section = await this.prisma.section.findUnique({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');

    // Optional: delete related questions first
    await this.prisma.question.deleteMany({
      where: { sectionId: id },
    });

    await this.prisma.section.delete({ where: { id } });

    return { message: `Section with ID ${id} deleted successfully` };
  }
}
