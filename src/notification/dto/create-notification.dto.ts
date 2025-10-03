import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  type: string; // "payment" | "survey" | "system"
}