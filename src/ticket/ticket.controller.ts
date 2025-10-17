import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PaginationDto, UpdateTicketDto } from './dto/update-ticket.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Post()
  async create(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser('userId') userId: number,
  ) {
    try {
      return await this.ticketService.create(createTicketDto, userId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Roles('admin')
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    try {
      return await this.ticketService.findAll(pagination.page,
        pagination.limit);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('my-tickets')
  async findMyTickets(
    @CurrentUser('userId') userId: number,
    @Query() pagination: PaginationDto,
  ) {
    try {
      return await this.ticketService.findAllByUser(
        userId,
        pagination.page,
        pagination.limit,
      );
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

  @Delete('hard/:id')
  async hardDelete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.ticketService.hardDelete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch('close/:id')
  async updateToClose(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketService.updateToClose(id, dto);
  }

  @Roles('admin')
  @Patch('assign/:id/:userId')
  async assignTicket(
    @Param('id', ParseIntPipe) ticketId: number,
    @Param('userId', ParseIntPipe) assignedToId: number,
  ) {
    return this.ticketService.assignTicket(ticketId, assignedToId);
  }
}
