import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SurveyPointService } from './survey-point.service';
import { UpdateSurveyPointConfigDto } from './dto/update-survey-point-config.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Survey Point Configuration')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('survey-point-config')
export class SurveyPointController {
  constructor(private readonly surveyPointService: SurveyPointService) {}

  /**
   * GET /survey-point-config
   * Fetch current active point scoring model configuration and fallback defaults.
   */
  @ApiOperation({
    summary: 'Get Survey Point Scoring Configuration',
    description: 'Retrieves the active 6-factor weighted scoring model weights, level thresholds, and point rewards per level.',
  })
  @ApiResponse({
    status: 200,
    description: 'Configuration retrieved successfully.',
    schema: {
      example: {
        status: 'success',
        data: {
          weights: {
            time: 0.3,
            recruitment: 0.25,
            cognitive: 0.15,
            participation: 0.15,
            urgency: 0.1,
            sensitivity: 0.05,
          },
          levels: [
            { level: 1, minScore: 1.0, maxScore: 2.0, points: 100 },
            { level: 2, minScore: 2.01, maxScore: 3.0, points: 200 },
            { level: 3, minScore: 3.01, maxScore: 4.0, points: 300 },
            { level: 4, minScore: 4.01, maxScore: 5.0, points: 400 },
          ],
        },
      },
    },
  })
  @Get()
  async getConfig() {
    const config = await this.surveyPointService.getConfig();
    return {
      status: 'success',
      data: config,
    };
  }

  /**
   * PUT /survey-point-config
   * Update weights, levels, and point allotments in production (Admin only).
   */
  @ApiOperation({
    summary: 'Update Survey Point Scoring Configuration (Admin Only)',
    description: 'Allows administrators to dynamically update factor weights, score boundaries, and points per level live in production.',
  })
  @ApiResponse({
    status: 200,
    description: 'Configuration updated successfully.',
    schema: {
      example: {
        status: 'success',
        message: 'Survey point scoring configuration updated successfully.',
        data: {
          weights: {
            time: 0.3,
            recruitment: 0.25,
            cognitive: 0.15,
            participation: 0.15,
            urgency: 0.1,
            sensitivity: 0.05,
          },
          levels: [
            { level: 1, minScore: 1.0, maxScore: 2.0, points: 100 },
            { level: 2, minScore: 2.01, maxScore: 3.0, points: 200 },
            { level: 3, minScore: 3.01, maxScore: 4.0, points: 300 },
            { level: 4, minScore: 4.01, maxScore: 5.0, points: 400 },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Missing or invalid JWT token.' })
  @ApiResponse({ status: 403, description: 'Forbidden - User is not an Admin.' })
  @Roles('Admin')
  @Put()
  async updateConfig(@Body() dto: UpdateSurveyPointConfigDto) {
    const updated = await this.surveyPointService.updateConfig(dto);
    return {
      status: 'success',
      message: 'Survey point scoring configuration updated successfully.',
      data: updated,
    };
  }
}
