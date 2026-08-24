import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/utils/pagination.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Questions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @ApiOperation({ summary: 'Create a single question' })
  @ApiResponse({ status: 201, description: 'Question created successfully.' })
  @Post()
  create(
    @Body(new ValidationPipe()) createQuestionDto: CreateQuestionDto,
    @CurrentUser('sub') sub: number,
  ) {
    return this.questionService.create(createQuestionDto, sub);
  }

  @ApiOperation({ summary: 'Create multiple questions (Bulk)' })
  @ApiResponse({ status: 201, description: 'Questions created successfully.' })
  @Post('multiple')
  async createMany(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: CreateQuestionDto | CreateQuestionDto[],
    @CurrentUser('sub') sub: number,
  ) {
    if (Array.isArray(body)) {
      return this.questionService.createMany(body, sub);
    }
    return this.questionService.create(body, sub);
  }

  @ApiOperation({ summary: 'Get all questions (Admin)' })
  @Roles('Admin')
  @Get('all-question')
  findAll(@Query() pagination: PaginationDto) {
    return this.questionService.findAll(pagination.page, pagination.limit);
  }

  @ApiOperation({ summary: 'Get all questions created by authenticated user' })
  @Get('my-question')
  findAllMyQuestion(
    @Query() pagination: PaginationDto,
    @CurrentUser('sub') sub: number,
  ) {
    return this.questionService.findAllMyQuestions(
      sub,
      pagination.page,
      pagination.limit,
    );
  }

  @ApiOperation({ summary: 'Get questions by survey ID (query param)' })
  @Get('')
  findAllSurvey(@Query('surveyId', ParseIntPipe) surveyId: number) {
    return this.questionService.findBySurvey(surveyId);
  }

  @ApiOperation({ summary: 'Get questions by survey ID' })
  @ApiParam({ name: 'surveyId', description: 'Survey ID' })
  @Get('survey/:surveyId')
  findBySurvey(@Param('surveyId') surveyId: string) {
    return this.questionService.findBySurvey(+surveyId);
  }

  @ApiOperation({ summary: 'Get question by ID' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update question by ID' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @ApiOperation({ summary: 'Delete question by ID' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.remove(+id);
  }
}
