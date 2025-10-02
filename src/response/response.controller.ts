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
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('responses')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) { }

  // Submit a response to a question
  @Post()
  async create(
    @Body() createResponseDto: CreateResponseDto,
    @CurrentUser('userId') userId: number,
  ) {
    return this.responseService.create(createResponseDto, userId);
  }

  // Get all responses
  @Get()
  async findAll() {
    return this.responseService.findAll();
  }

  // Get all responses for a specific question
  @Get('question/:questionId')
  async findByQuestion(@Param('questionId', ParseIntPipe) questionId: number) {
    return this.responseService.findByQuestion(questionId);
  }

  // Get all responses for a specific survey
  @Get('survey/:surveyId')
  async findBySurvey(@Param('surveyId', ParseIntPipe) surveyId: number) {
    return this.responseService.findBySurvey(surveyId);
  }

  // Get a single response
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const response = await this.responseService.findOne(id);
    if (!response) throw new NotFoundException(`Response with ID ${id} not found`);
    return response;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResponseDto: UpdateResponseDto,
  ) {
    const updated = await this.responseService.update(id, updateResponseDto);
    if (!updated) throw new NotFoundException(`Response with ID ${id} not found`);
    return updated;
  }


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.responseService.remove(id);
    if (!deleted) throw new NotFoundException(`Response with ID ${id} not found`);
    return deleted;
  }
}
