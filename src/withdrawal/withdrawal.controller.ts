import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Withdrawals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @ApiOperation({ summary: 'Request a funds withdrawal from wallet' })
  @ApiResponse({ status: 201, description: 'Withdrawal request created.' })
  @Post()
  create(
    @Body() createWithdrawalDto: CreateWithdrawalDto,
    @CurrentUser('sub') sub: number,
  ) {
    return this.withdrawalService.create(sub, createWithdrawalDto);
  }

  @ApiOperation({ summary: 'Get all withdrawal requests' })
  @Get()
  findAll() {
    return this.withdrawalService.findAll();
  }

  @ApiOperation({ summary: 'Get withdrawal request by ID' })
  @ApiParam({ name: 'id', description: 'Withdrawal ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.withdrawalService.findOne(+id);
  }

  @ApiOperation({ summary: 'Delete withdrawal request by ID' })
  @ApiParam({ name: 'id', description: 'Withdrawal ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.withdrawalService.remove(+id);
  }

  @ApiOperation({ summary: 'Approve or decline withdrawal request (Admin)' })
  @ApiParam({ name: 'id', description: 'Withdrawal ID' })
  @Patch('approve-withdrawal-request/:id')
  handleWithdrawalAction(
    @Param('id') id: string,
    @CurrentUser('sub') sub: number,
    @Body('action') action: 'approve' | 'reject',
  ) {
    if (action === 'approve') {
      return this.withdrawalService.approveWithdrawal(+id, sub);
    }

    if (action === 'reject') {
      return this.withdrawalService.declineWithdrawal(+id, sub);
    }

    throw new BadRequestException('Invalid action');
  }
}
