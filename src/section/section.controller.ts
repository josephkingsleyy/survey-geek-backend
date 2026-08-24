import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Limit } from 'src/common/utils/app';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Sections')
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({ status: 201, description: 'Section created successfully.' })
  @Post()
  async create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @ApiOperation({ summary: 'Get all sections with optional pagination and surveyId filter' })
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = Limit,
    @Query('surveyId') surveyId?: string,
  ) {
    return this.sectionService.findAll(
      page,
      limit,
      surveyId ? +surveyId : undefined,
    );
  }

  @ApiOperation({ summary: 'Get section by ID' })
  @ApiParam({ name: 'id', description: 'Section ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.findOne(id);
  }

  @ApiOperation({ summary: 'Update section by ID' })
  @ApiParam({ name: 'id', description: 'Section ID' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @ApiOperation({ summary: 'Delete section by ID' })
  @ApiParam({ name: 'id', description: 'Section ID' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.remove(id);
  }
}
