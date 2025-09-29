import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTicketDto: CreateTicketDto, userId: number) {
    try {
      const ticket = await this.prisma.ticket.create({
        data: {
          title: createTicketDto.title,
          description: createTicketDto.description,
          status: createTicketDto.status || 'open',
          priority: createTicketDto.priority,
          category: createTicketDto.category,
          userId,
          attachments: createTicketDto.attachments
            ? {
              create: createTicketDto.attachments.map((a) => ({
                url: a.url,
                filename: a.filename,
              })),
            }
            : undefined,
        },
        include: { attachments: true },
      });
      return ticket;
    } catch (err) {
      throw new Error(err.message);
    }
  }


  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const [tickets, total] = await Promise.all([
        this.prisma.ticket.findMany({
          skip,
          take: limit,
          include: { attachments: true },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.ticket.count(),
      ]);

      return {
        data: tickets,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }


  async findOne(id: number) {
    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: { id },
        include: { attachments: true },
      });
      if (!ticket) throw new NotFoundException('Ticket not found');
      return ticket;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }


  async update(id: number, dto: UpdateTicketDto) {
    try {
      const ticket = await this.prisma.ticket.findUnique({ where: { id } });
      if (!ticket) throw new NotFoundException('Ticket not found');

      return this.prisma.ticket.update({
        where: { id },
        data: {
          ...dto,
          attachments: dto.attachments
            ? {
              create: dto.attachments.map((a) => ({
                url: a.url,
                filename: a.filename,
              })),
            }
            : undefined,
        },
        include: { attachments: true },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async softDelete(id: number) {
    try {
      const ticket = await this.prisma.ticket.findUnique({ where: { id } });
      if (!ticket) throw new NotFoundException('Ticket not found');

      return this.prisma.ticket.update({
        where: { id },
        data: { status: 'deleted' },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async hardDelete(id: number) {
    try {
      const ticket = await this.prisma.ticket.findUnique({ where: { id } });
      if (!ticket) throw new NotFoundException('Ticket not found');

      return this.prisma.ticket.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
