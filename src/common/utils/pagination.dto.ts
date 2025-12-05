import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Limit } from './app';

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
    limit?: number = Limit;
}