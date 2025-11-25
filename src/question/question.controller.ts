import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/utils/pagination.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post()
  create(@Body(new ValidationPipe()) createQuestionDto: CreateQuestionDto,
    @CurrentUser('sub') sub: number) {
    return this.questionService.create(createQuestionDto, sub);
  }

  @Post('multiple')
  async createMany(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: CreateQuestionDto | CreateQuestionDto[],
    @CurrentUser('sub') sub: number
  ) {
    if (Array.isArray(body)) {
      return this.questionService.createMany(body, sub); // bulk create
    }
    return this.questionService.create(body, sub); // single create
  }

  @Roles("admin")
  @Get('all-question')
  findAll(@Query() pagination: PaginationDto) {
    return this.questionService.findAll(pagination.page,
      pagination.limit);
  }

  @Get('my-question')
  findAllMyQuestion(@Query() pagination: PaginationDto,
    @CurrentUser('sub') sub: number) {
    return this.questionService.findAllMyQuestions(sub, pagination.page,
      pagination.limit);
  }

  @Get('')
  findAllSurvey(@Query('surveyId', ParseIntPipe) surveyId: number) {
    return this.questionService.findBySurvey(surveyId);
  }

  @Get('survey/:surveyId')
  findBySurvey(@Param('surveyId') surveyId: string) {
    return this.questionService.findBySurvey(+surveyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  // Delete a question
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.remove(+id);
  }
}
