import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { BuyPointsDto, CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/utils/pagination.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Payments & Wallet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @ApiOperation({ summary: 'Initialize a new payment deposit' })
  @ApiResponse({ status: 201, description: 'Payment initialized successfully.' })
  @Post()
  create(
    @Body() createPaymentDto: CreatePaymentDto,
    @CurrentUser('sub') sub: number,
  ) {
    return this.paymentService.create(createPaymentDto, sub);
  }

  @ApiOperation({ summary: 'Get all payments (Admin only)' })
  @Roles('Admin')
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.paymentService.findAll(pagination.page, pagination.limit);
  }

  @ApiOperation({ summary: 'Get payment history for authenticated user' })
  @Get('my-payments')
  async findMyPayments(
    @CurrentUser('sub') sub: number,
    @Query() pagination: PaginationDto,
  ) {
    return this.paymentService.findMyPayments(
      sub,
      pagination.page,
      pagination.limit,
    );
  }

  @ApiOperation({ summary: 'Get payment record by ID' })
  @ApiParam({ name: 'id', description: 'Payment ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update payment record by ID' })
  @ApiParam({ name: 'id', description: 'Payment ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete payment record by ID' })
  @ApiParam({ name: 'id', description: 'Payment ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }

  @ApiOperation({ summary: 'Verify payment callback reference' })
  @Get('callback/check')
  async paymentCallback(@Query('reference') reference: string) {
    return this.paymentService.verifyPayment(reference);
  }

  @ApiOperation({ summary: 'Buy points using wallet cash balance' })
  @Post('buy-points')
  buyPoints(@CurrentUser('sub') sub: number, @Body() dto: BuyPointsDto) {
    return this.paymentService.convertWalletToPoints(sub, dto.points);
  }

  @ApiOperation({ summary: 'Sell points for wallet cash balance' })
  @Post('sell-points')
  sellPoints(@CurrentUser('sub') sub: number, @Body() dto: BuyPointsDto) {
    return this.paymentService.convertPointsToWallet(sub, dto.points);
  }

  @ApiOperation({ summary: 'Get current user wallet balance and points' })
  @Get('my/wallet')
  getWallet(@CurrentUser('sub') sub: number) {
    return this.paymentService.getWallet(sub);
  }

  @ApiOperation({ summary: 'Get list of supported banks for withdrawal' })
  @Get('bank-list')
  getBankList() {
    return this.paymentService.getBankList();
  }
}
