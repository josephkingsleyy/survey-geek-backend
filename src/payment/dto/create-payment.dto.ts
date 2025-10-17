import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string = 'NGN';

  @IsString()
  @IsOptional()
  status?: string = 'pending';

  @IsString()
  @IsOptional()
  method?: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  paidAt?: Date;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
