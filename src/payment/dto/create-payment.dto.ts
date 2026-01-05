import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsInt, Min } from 'class-validator';
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

  @IsOptional()
  @IsString()
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


export class BuyPointsDto {
  @IsInt()
  @Min(1)
  points: number;
}
