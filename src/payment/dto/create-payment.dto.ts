import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 5000, description: 'Payment amount' })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ example: 'NGN' })
  @IsString()
  @IsOptional()
  currency?: string = 'NGN';

  @ApiPropertyOptional({ example: 'pending' })
  @IsString()
  @IsOptional()
  status?: string = 'pending';

  @ApiPropertyOptional({ example: 'card' })
  @IsString()
  @IsOptional()
  method?: string;

  @ApiPropertyOptional({ example: 'PAY_REF_123456789' })
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional({ example: 'Wallet top-up' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '2026-08-24T21:00:00.000Z' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  paidAt?: Date;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}

export class BuyPointsDto {
  @ApiProperty({ example: 100, description: 'Number of points to purchase or sell' })
  @IsInt()
  @Min(1)
  points: number;
}
