import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { sendEmail } from 'src/common/utils/mail-service';
import { Prisma } from '@prisma/client';
import { Limit } from 'src/common/utils/app';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED',
}
export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTicketDto: CreateTicketDto, userId: number) {

    try {
      const ticket = await this.prisma.ticket.create({
        data: {
          title: createTicketDto.title,
          description: createTicketDto.description,
          status: TicketStatus.OPEN,
          priority: Priority.URGENT,
          category: createTicketDto.category,
          userId: userId,
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

      const admins = await this.prisma.user.findMany({
        where: { role: 'admin', softDelete: false },
        select: { email: true },
      });

      if (admins.length > 0) {
        for (const admin of admins) {
          await sendEmail({
            to: admin.email,
            subject: 'New Ticket Created',
            text: `A new ticket (#${ticket.id}) has been created by user ${userId}: ${ticket.title}`,
          });
        }
      }

      return ticket;
    } catch (err) {
      throw new Error(err.message);
    }
  }


  async findAll(page = 1, limit = Limit) {
    try {
      const skip = (page - 1) * limit;

      const [tickets, total] = await Promise.all([
        this.prisma.ticket.findMany({
          skip,
          take: limit,
          include: { user: true, assignedTo: true, attachments: true },
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

  async findAllByUser(userId: number, page = 1, limit = Limit) {
    try {
      const skip = (page - 1) * limit;
      const tickets = await this.prisma.ticket.findMany({
        where: {
          OR: [
            { userId },           // tickets created by the user
            { assignedToId: userId }, // tickets assigned to the user
          ],
        },
        skip,
        take: limit,
        include: { user: true, assignedTo: true, attachments: true },
        orderBy: { createdAt: 'desc' },
      });
      const total = await this.prisma.ticket.count({
        where: {
          OR: [
            { userId },
            { assignedToId: userId },
          ],
        },
      });

      return { total, page, limit, tickets };
    } catch (error) {
      throw new NotFoundException(error.message);

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


  async hardDelete(id: number) {
    try {
      const ticket = await this.prisma.ticket.findUnique({ where: { id } });
      if (!ticket) throw new NotFoundException('Ticket not found');

      return this.prisma.ticket.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async assignTicket(ticketId: number, assignedToId: number) {
    try {
      const ticket = await this.prisma.ticket.update({
        where: { id: ticketId },
        data: { assignedToId },
        include: { assignedTo: true },
      });

      if (ticket.assignedTo?.email) {
        await sendEmail({
          to: ticket.assignedTo.email,
          subject: 'Ticket Assigned to You',
          text: `You have been assigned to ticket #${ticket.id}: ${ticket.title}`,
        });
      }

      return ticket;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateToClose(id: number, dto: UpdateTicketDto) {
    try {
      const ticket = await this.prisma.ticket.update({
        where: { id },
        data: {
          // spread dto, but exclude attachments since we need special handling
          title: dto.title,
          description: dto.description,
          category: dto.category,
          priority: dto.priority,
          status: dto.status,
          ...(dto.status === TicketStatus.CLOSED && { closedAt: new Date() }),

          ...(dto.attachments && {
            attachments: {
              create: dto.attachments.map((file) => ({
                url: file.url,
                filename: file.filename,
              })),
            },
          }),
        },
        include: { user: true },
      }) as Prisma.TicketGetPayload<{ include: { user: true } }>;

      if (dto.status && dto.status.toUpperCase() === 'CLOSED') {
        if (ticket.user?.email) {
          await sendEmail({
            to: ticket.user.email,
            subject: 'Your Ticket has been Closed',
            text: `Your ticket (#${ticket.id}) "${ticket.title}" has been resolved and closed.`,
          });
        }
      }

      return ticket;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

}
