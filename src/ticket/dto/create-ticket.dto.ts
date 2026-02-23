import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  attachments?: { url: string; filename: string }[]; // optional attachments

  @IsOptional()
  @IsString()
  thumb?: string;

  @IsOptional()
  @IsString()
  AgentName?: string;
}
