import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWithdrawalDto {
  @ApiProperty({ example: 10000, description: 'Withdrawal amount in NGN' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '0123456789', description: 'Bank account number' })
  @IsString()
  @IsOptional()
  accountNumber: string;

  @ApiProperty({ example: 'John Doe', description: 'Bank account name' })
  @IsString()
  @IsNotEmpty()
  accountName: string;

  @ApiPropertyOptional({ example: 'GTBank', description: 'Name of destination bank' })
  @IsString()
  @IsOptional()
  bankName?: string;

  @ApiPropertyOptional({ example: '50453', description: 'Paystack bank code for the destination bank' })
  @IsString()
  @IsOptional()
  bankCode?: string;

  @ApiPropertyOptional({ example: 'Withdrawal Request' })
  @IsString()
  @IsOptional()
  note?: string = 'Withdrawal Request';
}
