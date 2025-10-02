import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaginationDto } from 'src/ticket/dto/update-ticket.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto,
    @CurrentUser('userId') userId: number,
  ) {
    return this.paymentService.create(createPaymentDto, userId);
  }

  @Get()
  findAll(
    @Query() pagination: PaginationDto
  ) {
    return this.paymentService.findAll(pagination.page,
      pagination.limit);
  }

  @Get('my-payments')
  async findMyPayments(
    @CurrentUser('userId') userId: number,
    @Query() pagination: PaginationDto,
  ) {
    return this.paymentService.findMyPayments(userId,
      pagination.page,
      pagination.limit
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }

  @Post('initialize')
  async initializePayment(@Body() dto: CreatePaymentDto,
    @CurrentUser('userId') userId: number,

  ) {
    return this.paymentService.create(dto, userId);
  }

  @Get('callback')
  async paymentCallback(@Query('reference') reference: string) {
    return this.paymentService.verifyPayment(reference);
  }
}
