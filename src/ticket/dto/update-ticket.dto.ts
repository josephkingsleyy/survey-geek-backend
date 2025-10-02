import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsOptional, IsInt, Min, IsString, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TicketPriority, TicketStatus } from '@prisma/client';


export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsOptional()
  @IsEnum(TicketStatus, { message: 'status must be a valid TicketStatus enum value' })
  status?: TicketStatus;

  @IsOptional()
  @IsEnum(TicketPriority, { message: 'priority must be a valid TicketPriority enum value' })
  priority?: TicketPriority;

}



export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
