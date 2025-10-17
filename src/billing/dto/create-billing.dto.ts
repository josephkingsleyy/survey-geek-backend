import { IsString, IsNumber, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateBillingDto {
  @IsString()
  planName: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: Date;

  @IsOptional()
  @IsInt()
  userId?: number;
}
