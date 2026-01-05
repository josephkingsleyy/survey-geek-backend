import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) { }

  @Post()
  create(@Body() createWithdrawalDto: CreateWithdrawalDto,
    @CurrentUser('sub') sub: number) {
    return this.withdrawalService.create(sub, createWithdrawalDto);
  }

  @Get()
  findAll() {
    return this.withdrawalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.withdrawalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWithdrawalDto: UpdateWithdrawalDto) {
    return this.withdrawalService.update(+id, updateWithdrawalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.withdrawalService.remove(+id);
  }


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
