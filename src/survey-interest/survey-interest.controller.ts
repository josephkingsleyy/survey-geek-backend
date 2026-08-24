import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SurveyInterestService } from './survey-interest.service';
import {
  ChooseSurveyInterestsDto,
  CreateSurveyInterestDto,
} from './dto/create-survey-interest.dto';
import { UpdateSurveyInterestDto } from './dto/update-survey-interest.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Survey Interests')
@Controller('survey-interest')
export class SurveyInterestController {
  constructor(private readonly surveyInterestService: SurveyInterestService) {}

  @ApiOperation({ summary: 'Create a survey interest category' })
  @ApiResponse({ status: 201, description: 'Interest category created successfully.' })
  @Post('')
  async createSurveyInterest(@Body() dto: CreateSurveyInterestDto) {
    return this.surveyInterestService.create(dto);
  }

  @ApiOperation({ summary: 'Get all survey interest categories' })
  @ApiResponse({ status: 200, description: 'List of interest categories fetched successfully.' })
  @Get()
  findAll() {
    return this.surveyInterestService.findAll();
  }

  @ApiOperation({ summary: 'Update a survey interest category by ID' })
  @ApiParam({ name: 'id', description: 'Survey interest ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Interest category updated successfully.' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSurveyInterestDto) {
    return this.surveyInterestService.update(id, dto);
  }

  @ApiOperation({ summary: 'Choose survey interests for authenticated user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('choose/select')
  async chooseInterests(
    @CurrentUser('userId') userId: number,
    @Body() dto: ChooseSurveyInterestsDto,
  ) {
    return this.surveyInterestService.chooseMany(
      {
        interestIds: dto.interestIds,
      },
      userId,
    );
  }

  @ApiOperation({ summary: 'Create a new interest category and assign to user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create-and-choose')
  async createAndChoose(
    @CurrentUser('userId') userId: number,
    @Body() dto: CreateSurveyInterestDto,
  ) {
    return this.surveyInterestService.createAndChoose(userId, dto);
  }

  @ApiOperation({ summary: 'Delete a survey interest category by ID' })
  @ApiParam({ name: 'id', description: 'Survey interest ID', example: 1 })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.surveyInterestService.delete(id);
  }
}
