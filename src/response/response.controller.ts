import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/utils/pagination.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Responses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('responses')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) { }

  @ApiOperation({
    summary: 'Submit a response to a survey question',
    description: 'Submits an answer to a question. If this is the final required question of the survey, points are automatically credited to respondent wallet.',
  })
  @ApiResponse({
    status: 201,
    description: 'Response submitted successfully. Returns surveyCompleted and reward info if survey is completed.',
  })
  @Post()
  async create(
    @Body() createResponseDto: CreateResponseDto,
    @CurrentUser('sub') sub: number,
  ) {
    return this.responseService.create(createResponseDto, sub);
  }

  @ApiOperation({ summary: 'Get all responses across all surveys (Admin only)' })
  @Roles('Admin')
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return this.responseService.findAll(pagination.page, pagination.limit);
  }

  @ApiOperation({ summary: 'Get all survey responses submitted by authenticated user' })
  @Get('my-responses')
  async findAllMyResponses(
    @Query() pagination: PaginationDto,
    @CurrentUser('sub') sub: number,
  ) {
    return this.responseService.findAllMyResponses(
      sub,
      pagination.page,
      pagination.limit,
    );
  }

  @ApiOperation({ summary: 'Get all responses for a specific question' })
  @ApiParam({ name: 'questionId', description: 'Question ID' })
  @Get('question/:questionId')
  async findByQuestion(@Param('questionId', ParseIntPipe) questionId: number) {
    return this.responseService.findByQuestion(questionId);
  }

  @ApiOperation({ summary: 'Get all responses for a specific survey' })
  @ApiParam({ name: 'surveyId', description: 'Survey ID' })
  @Get('survey/:surveyId')
  async findBySurvey(@Param('surveyId', ParseIntPipe) surveyId: number) {
    return this.responseService.findBySurvey(surveyId);
  }

  @ApiOperation({ summary: 'Get my submitted responses for a specific survey' })
  @ApiParam({ name: 'surveyId', description: 'Survey ID' })
  @Get('my-survey/:surveyId')
  async findMySurvey(
    @Param('surveyId', ParseIntPipe) surveyId: number,
    @CurrentUser('sub') sub: number,
  ) {
    return this.responseService.findMySurvey(surveyId, sub);
  }

  @ApiOperation({ summary: 'Get a single response by ID' })
  @ApiParam({ name: 'id', description: 'Response ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const response = await this.responseService.findOne(id);
    if (!response)
      throw new NotFoundException(`Response with ID ${id} not found`);
    return response;
  }

  @ApiOperation({ summary: 'Update a response by ID' })
  @ApiParam({ name: 'id', description: 'Response ID' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResponseDto: UpdateResponseDto,
  ) {
    const updated = await this.responseService.update(id, updateResponseDto);
    if (!updated)
      throw new NotFoundException(`Response with ID ${id} not found`);
    return updated;
  }

  @ApiOperation({ summary: 'Delete a response by ID' })
  @ApiParam({ name: 'id', description: 'Response ID' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.responseService.remove(id);
    if (!deleted)
      throw new NotFoundException(`Response with ID ${id} not found`);
    return deleted;
  }
}
