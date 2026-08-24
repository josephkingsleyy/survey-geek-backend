import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PaginationDto, UpdateTicketDto } from './dto/update-ticket.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Support Tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @ApiOperation({ summary: 'Create a support ticket' })
  @ApiResponse({ status: 201, description: 'Support ticket created.' })
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

  @ApiOperation({ summary: 'Get all support tickets (Admin)' })
  @Roles('Admin')
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    try {
      return await this.ticketService.findAll(
        pagination.page,
        pagination.limit,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get tickets created by authenticated user' })
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

  @ApiOperation({ summary: 'Get staff list available for ticket assignment' })
  @Get('staff-list')
  async getStaffList(
    @Query() pagination: PaginationDto,
    @Query('userName') userName: string,
    @Query('userId') userId: string,
  ) {
    try {
      return await this.ticketService.getStaffList(
        pagination.page,
        pagination.limit,
        userId ? parseInt(userId) : undefined,
        userName,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get support ticket by ID' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.ticketService.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Update support ticket by ID' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTicketDto,
  ) {
    try {
      return await this.ticketService.update(+id, dto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Hard delete ticket permanently' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @Delete('hard/:id')
  async hardDelete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.ticketService.hardDelete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Close support ticket' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @Patch('close/:id')
  async updateToClose(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketService.updateToClose(id, dto);
  }

  @ApiOperation({ summary: 'Assign ticket to staff member (Admin)' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiParam({ name: 'userId', description: 'Staff user ID' })
  @Roles('Admin')
  @Patch('assign/:id/:userId')
  async assignTicket(
    @Param('id', ParseIntPipe) ticketId: number,
    @Param('userId', ParseIntPipe) assignedToId: number,
  ) {
    return this.ticketService.assignTicket(ticketId, assignedToId);
  }
}
