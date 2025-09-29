import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PaginationDto, UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    try {
      const userId = 1; // replace with request.user.id from JWT
      return await this.ticketService.create(createTicketDto, userId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // return this.ticketService.create(createTicketDto);
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    try {
      return await this.ticketService.findAll(pagination.page,
        pagination.limit);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.ticketService.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTicketDto) {
    try {
      return await this.ticketService.update(id, dto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
  @Delete('soft/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.ticketService.softDelete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.ticketService.hardDelete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
