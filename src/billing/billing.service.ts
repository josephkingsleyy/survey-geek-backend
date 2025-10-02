import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillingService {

  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateBillingDto) {
    try {
      return this.prisma.billing.create({
        data: {
          planName: dto.planName,
          amount: dto.amount,
          currency: dto.currency,
          expiresAt: dto.expiresAt,
          userId: dto.userId,
        },
      });

    } catch (error) {
      console.log('Error creating billing:', error);
      throw error;
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const [billings, total] = await Promise.all([
        this.prisma.billing.findMany({
          skip,
          take: limit,
          include: { user: { select: { id: true, email: true } } },
          orderBy: { id: 'desc' },
        }),
        this.prisma.billing.count()
      ]);
      return {
        data: billings,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.log('Error fetching billings:', error);
      throw error;
    }


  }

  async findOne(id: number) {
    try {
      const billing = await this.prisma.billing.findUnique({
        where: { id },
        include: { user: { select: { id: true, email: true } } },
      });

      if (!billing) throw new NotFoundException(`Billing with ID ${id} not found`);

      return billing;
    } catch (error) {
      console.log('Error fetching billing:', error);
      throw error;
    }

  }

  async update(id: number, dto: UpdateBillingDto) {
    try {
      const billing = await this.prisma.billing.findUnique({ where: { id } });
      if (!billing) throw new NotFoundException(`Billing with ID ${id} not found`);

      return this.prisma.billing.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      console.log('Error updating billing:', error);
      throw error;
    }

  }

  async remove(id: number) {
    try {
      const billing = await this.prisma.billing.findUnique({ where: { id } });
      if (!billing) throw new NotFoundException(`Billing with ID ${id} not found`);

      return this.prisma.billing.delete({ where: { id } });

    } catch (error) {
      console.log('Error deleting billing:', error);
      throw error;
    }
  }

}
