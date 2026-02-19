import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  role?: string;

  @IsInt()
  userId: number;
}