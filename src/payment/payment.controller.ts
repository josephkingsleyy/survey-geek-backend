import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { BuyPointsDto, CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/utils/pagination.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto,
    @CurrentUser('sub') sub: number,
  ) {
    return this.paymentService.create(createPaymentDto, sub);
  }

  @Roles('admin')
  @Get()
  findAll(
    @Query() pagination: PaginationDto,
  ) {
    return this.paymentService.findAll(pagination.page,
      pagination.limit);
  }

  @Get('my-payments')
  async findMyPayments(
    @CurrentUser('sub') sub: number,
    @Query() pagination: PaginationDto,
  ) {
    return this.paymentService.findMyPayments(sub,
      pagination.page,
      pagination.limit
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }

  @Get('callback/check')
  async paymentCallback(@Query('reference') reference: string) {
    return this.paymentService.verifyPayment(reference);
  }

  @Post('buy-points')
  buyPoints(
    @CurrentUser('sub') sub: number,
    @Body() dto: BuyPointsDto,
  ) {
    return this.paymentService.convertWalletToPoints(sub, dto.points);
  }

  @Post('sell-points')
  sellPoints(
    @CurrentUser('sub') sub: number,
    @Body() dto: BuyPointsDto,
  ) {
    return this.paymentService.convertPointsToWallet(sub, dto.points);
  }

  @Get('my/wallet')
  getWallet(@CurrentUser('sub') sub: number) {
    return this.paymentService.getWallet(sub);
  }

  @Get('bank-list')
  getBankList() {
    return this.paymentService.getBankList();
  }

 
}
