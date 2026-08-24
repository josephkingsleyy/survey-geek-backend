import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiPropertyOptional({ example: 'Admin', description: 'New role string (e.g. Admin, User, Researcher)' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ example: 1, description: 'User ID whose role is being updated' })
  @IsInt()
  userId: number;
}
