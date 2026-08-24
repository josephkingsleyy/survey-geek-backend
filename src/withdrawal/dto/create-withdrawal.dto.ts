import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWithdrawalDto {
  @ApiProperty({ example: 10000, description: 'Withdrawal amount in NGN' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '0123456789', description: 'Bank account number' })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({ example: 'John Doe', description: 'Bank account name' })
  @IsString()
  @IsNotEmpty()
  accountName: string;

  @ApiProperty({ example: 'GTBank', description: 'Name of destination bank' })
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @ApiPropertyOptional({ example: 'Withdrawal Request' })
  @IsString()
  @IsOptional()
  note?: string = 'Withdrawal Request';
}
