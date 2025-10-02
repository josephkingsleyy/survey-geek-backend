import { Injectable } from '@nestjs/common';
import { ChooseSurveyInterestsDto, CreateSurveyInterestDto } from './dto/create-survey-interest.dto';
import { UpdateSurveyInterestDto } from './dto/update-survey-interest.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SurveyInterestService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateSurveyInterestDto) {
    try {
      return await this.prisma.surveyInterest.create({
        data: {
          name: dto.name,
        },
      });
    } catch (error) {
      throw new Error('Error creating survey interest');
    }
  }

  async findAll() {
    return this.prisma.surveyInterest.findMany();
  }

  async chooseMany(dto: ChooseSurveyInterestsDto, userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        surveyInterest: {
          connect: dto.interestIds.map((id) => ({ id })),
        },
      },
      include: { surveyInterest: true },
    });
  }

  async createAndChoose(userId: number, dto: CreateSurveyInterestDto) {
    let interest = await this.prisma.surveyInterest.findUnique({
      where: { name: dto.name },
    });

    if (!interest) {
      interest = await this.prisma.surveyInterest.create({
        data: { name: dto.name },
      });
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        surveyInterest: { connect: { id: interest.id } },
      },
      include: { surveyInterest: true },
    });
  }

  async update(id: number, dto: UpdateSurveyInterestDto) {
    let interest = await this.prisma.surveyInterest.findUnique({
      where: { id },
    });

    if (!interest) {
      throw new Error('Survey interest not found');
    }

    return this.prisma.surveyInterest.update({
      where: { id },
      data: { name: dto.name },
    });
  }

  async delete(id: number) {
    return await this.prisma.surveyInterest.delete({
      where: { id },
    });
  }
}
