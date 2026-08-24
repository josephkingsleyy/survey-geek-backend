import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { PaginationDto } from 'src/common/utils/pagination.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @ApiOperation({ summary: 'Create a billing record' })
  @ApiResponse({ status: 201, description: 'Billing record created.' })
  @Post()
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto);
  }

  @ApiOperation({ summary: 'Get all billing records with pagination' })
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.billingService.findAll(pagination.page, pagination.limit);
  }

  @ApiOperation({ summary: 'Get billing record by ID' })
  @ApiParam({ name: 'id', description: 'Billing ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update billing record by ID' })
  @ApiParam({ name: 'id', description: 'Billing ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingDto: UpdateBillingDto) {
    return this.billingService.update(+id, updateBillingDto);
  }

  @ApiOperation({ summary: 'Delete billing record by ID' })
  @ApiParam({ name: 'id', description: 'Billing ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingService.remove(+id);
  }
}
