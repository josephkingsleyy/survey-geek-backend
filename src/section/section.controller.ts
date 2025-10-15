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

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  // 🟢 Create a new section (optionally linked to a survey)
  @Post()
  async create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  // 🔹 Get all sections (with optional pagination and filtering by surveyId)
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('surveyId') surveyId?: string,
  ) {
    return this.sectionService.findAll(page, limit, surveyId ? +surveyId : undefined);
  }

  // 🔹 Get one section (with nested questions)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.findOne(id);
  }

  // 🟡 Update a section
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionService.update(id, updateSectionDto);
  }

  // 🔴 Delete a section (and optionally its questions)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.remove(id);
  }
}
