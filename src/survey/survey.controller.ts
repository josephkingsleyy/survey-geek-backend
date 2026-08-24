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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Surveys')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) { }

  @ApiOperation({ summary: 'Create a new survey' })
  @ApiResponse({ status: 201, description: 'Survey created successfully.' })
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

  @ApiOperation({ summary: 'Get all surveys (Admin only)' })
  @Roles('Admin')
  @Get()
  async findAll(
    @Query() pagination: PaginationDto,
    @CurrentUser() user: any,
    @Query('date') date?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('published') published?: boolean,
    @Query('completed') completed?: boolean,
    @Query('trash') trash?: boolean,
    @Query('pending') pending?: boolean,
    @Query('draft') draft?: boolean,
  ) {
    try {
      return await this.surveyService.findAll(
        pagination.page,
        pagination.limit,
        {
          date,
          status,
          search,
          category,
          published,
          completed,
          trash,
          pending,
          draft,
        },
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get survey counts grouped by status' })
  @Get('/count/surveys')
  async getSurveyCounts(
    @CurrentUser() user: any,
  ) {
    return await this.surveyService.getSurveyCounts(user);
  }

  @ApiOperation({ summary: 'Get distinct occupation and states for target audience' })
  @Get('/distinct/occupation-states')
  async getDistinctOccupationAndStates() {
    return await this.surveyService.getDistinctOccupationAndStates();
  }

  @ApiOperation({ summary: 'Get surveys created by authenticated user' })
  @Get('my-surveys')
  async findMySurveys(
    @CurrentUser('userId') userId: number,
    @Query() pagination: PaginationDto,
    @Query('date') date?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('published') published?: boolean,
    @Query('completed') completed?: boolean,
    @Query('trash') trash?: boolean,
    @Query('pending') pending?: boolean,
    @Query('draft') draft?: boolean,
  ) {
    try {
      return await this.surveyService.findAllByUser(
        userId,
        pagination.page,
        pagination.limit,
        {
          date,
          status,
          search,
          category,
          published,
          completed,
          trash,
          pending,
          draft,
        },
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get survey by slug' })
  @ApiParam({ name: 'slug', description: 'Survey unique slug' })
  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    try {
      return await this.surveyService.findOne(slug);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Get detailed survey information by slug' })
  @ApiParam({ name: 'slug', description: 'Survey unique slug' })
  @Get('details/:slug')
  async getSurveyDetails(@Param('slug') slug: string) {
    try {
      return await this.surveyService.getSurveyDetails(slug);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Update survey details by ID' })
  @ApiParam({ name: 'id', description: 'Survey ID' })
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

  @ApiOperation({ summary: 'Soft delete survey by ID' })
  @ApiParam({ name: 'id', description: 'Survey ID' })
  @Patch(':id/soft-delete')
  softDeleteSurvey(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.surveyService.softDelete(id);
  }

  @ApiOperation({ summary: 'Update survey with sections and questions' })
  @ApiParam({ name: 'id', description: 'Survey ID' })
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

  @ApiOperation({ summary: 'Reorder or update survey sections' })
  @ApiParam({ name: 'id', description: 'Survey ID' })
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

  @ApiOperation({ summary: 'Delete survey permanently by ID' })
  @ApiParam({ name: 'id', description: 'Survey ID' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.surveyService.remove(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Publish a draft survey' })
  @ApiParam({ name: 'id', description: 'Survey ID' })
  @Patch(':id/publish')
  publishSurvey(@Param('id') id: string, @CurrentUser('sub') userId: number) {
    return this.surveyService.publishSurvey(+id, userId);
  }
}
