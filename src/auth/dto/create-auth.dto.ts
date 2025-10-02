




import { IsEmail, IsOptional, isString, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;
}

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  gender?: string;
}

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}