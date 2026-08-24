import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';
import { IsOptional, IsInt, Min, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { TicketPriority, TicketStatus } from '@prisma/client';
import { Limit } from 'src/common/utils/app';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiPropertyOptional({ enum: TicketStatus, example: TicketStatus.RESOLVED })
  @IsOptional()
  @IsEnum(TicketStatus, {
    message: 'status must be a valid TicketStatus enum value',
  })
  status?: TicketStatus;

  @ApiPropertyOptional({ enum: TicketPriority, example: TicketPriority.HIGH })
  @IsOptional()
  @IsEnum(TicketPriority, {
    message: 'priority must be a valid TicketPriority enum value',
  })
  priority?: TicketPriority;

  @ApiPropertyOptional({ example: 2, description: 'ID of staff user assigned to ticket' })
  @IsOptional()
  @IsInt()
  assignedToId?: number;
}

export class PaginationDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = Limit;

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  age?: number;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @IsOptional()
  @IsString()
  email?: string;
}
