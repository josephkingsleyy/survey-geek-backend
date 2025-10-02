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
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/ticket/dto/update-ticket.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @Roles('admin')
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    try {
      return await this.surveyService.findAll(pagination.page, pagination.limit);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 🔹 User: get only their own surveys
  @Get('my-surveys')
  async findMySurveys(
    @CurrentUser('userId') userId: number,
    @Query() pagination: PaginationDto,
  ) {
    try {
      return await this.surveyService.findAllByUser(
        userId,
        pagination.page,
        pagination.limit,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.surveyService.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    try {
      return await this.surveyService.update(id, updateSurveyDto);
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
}
