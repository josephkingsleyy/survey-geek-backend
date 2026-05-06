import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import {
  ReorderSectionsDto,
  UpdateSurveyDto,
} from './dto/update-survey.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/utils/pagination.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) { }

  @Post()
  async create(
    @Body() createSurveyDto: CreateSurveyDto,
    @CurrentUser('userId') userId: number,
  ) {
    try {
      return await this.surveyService.create(createSurveyDto, userId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // 🔹 Admin: get all surveys with pagination
  @Roles('Admin')
  @Get()
  async findAll(
    @Query() pagination: PaginationDto,
    @CurrentUser() user: any,
    @Query('date') date?: string,
  ) {
    // console.log('User accessing findAll:', user);
    try {
      return await this.surveyService.findAll(
        pagination.page,
        pagination.limit,
        date,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 🔹 User: get only their own surveys
  @Get('my-surveys')
  async findMySurveys(
    @CurrentUser('userId') userId: number,
    @Query() pagination: PaginationDto,
    @Query('date') date?: string,
  ) {
    try {
      return await this.surveyService.findAllByUser(
        userId,
        pagination.page,
        pagination.limit,
        date,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    try {
      return await this.surveyService.findOne(slug);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('details/:slug')
  async getSurveyDetails(@Param('slug') slug: string) {
    try {
      return await this.surveyService.getSurveyDetails(slug);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    try {
      return await this.surveyService.update(id, updateSurveyDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/soft-delete')
  softDeleteSurvey(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.surveyService.softDelete(id);
  }

  @Patch('survey-with-question/:id')
  async updateWithQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurveyWithQuestionDto: UpdateSurveyDto,
  ) {
    try {
      return await this.surveyService.updateWithQuestion(
        id,
        updateSurveyWithQuestionDto,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('update-section/:id')
  async updateSection(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ReorderSectionsDto,
  ) {
    try {
      return await this.surveyService.updateSection(id, body.sections);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.surveyService.remove(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id/publish')
  publishSurvey(@Param('id') id: string, @CurrentUser('sub') userId: number) {
    return this.surveyService.publishSurvey(+id, userId);
  }
}
