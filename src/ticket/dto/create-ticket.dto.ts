import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ example: 'Payment issue with wallet top-up' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'I attempted to fund my wallet with ₦5000 but the balance has not reflected yet.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'OPEN' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'HIGH' })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiPropertyOptional({ example: 'Billing' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: [{ url: 'https://res.cloudinary.com/demo/image/upload/v1/receipt.pdf', filename: 'receipt.pdf' }] })
  @IsOptional()
  @IsArray()
  attachments?: { url: string; filename: string }[];

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/demo/image/upload/v1/thumb.jpg' })
  @IsOptional()
  @IsString()
  thumb?: string;

  @ApiPropertyOptional({ example: 'Support Agent' })
  @IsOptional()
  @IsString()
  AgentName?: string;
}
