import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsInt,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAuthDto {
  @ApiPropertyOptional({ example: 'user@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '2026-08-24T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  emailVerifiedAt?: Date;

  @ApiPropertyOptional({ example: 'newPassword123' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: 'john_doe' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: '+234' })
  @IsOptional()
  @IsString()
  phoneNumberDialCode?: string;

  @ApiPropertyOptional({ example: '8012345678' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: '+234' })
  @IsOptional()
  @IsString()
  alternatePhoneNumberDialCode?: string;

  @ApiPropertyOptional({ example: '8098765432' })
  @IsOptional()
  @IsString()
  alternatePhoneNumber?: string;

  @ApiPropertyOptional({ example: 'Nigeria' })
  @IsOptional()
  @IsString()
  countryOfResidence?: string;

  @ApiPropertyOptional({ example: 'Nigeria' })
  @IsOptional()
  @IsString()
  countryOfNationality?: string;

  @ApiPropertyOptional({ example: 'Lagos' })
  @IsOptional()
  @IsString()
  stateOfNationality?: string;

  @ApiPropertyOptional({ example: 'Lagos' })
  @IsOptional()
  @IsString()
  stateOfResidence?: string;

  @ApiPropertyOptional({ example: 'Ikeja' })
  @IsOptional()
  @IsString()
  cityOfResidence?: string;

  @ApiPropertyOptional({ example: 'Ikeja' })
  @IsOptional()
  @IsString()
  cityOfNationality?: string;

  @ApiPropertyOptional({ example: '12 Allen Avenue' })
  @IsOptional()
  @IsString()
  addressOfResidence?: string;

  @ApiPropertyOptional({ example: '12 Allen Avenue' })
  @IsOptional()
  @IsString()
  addressOfNationality?: string;

  @ApiPropertyOptional({ example: 'Employed' })
  @IsOptional()
  @IsString()
  employmentStatus?: string;

  @ApiPropertyOptional({ example: 'Email' })
  @IsOptional()
  @IsString()
  mostPreferredCommsChannel?: string;

  @ApiPropertyOptional({ example: 'Social Media' })
  @IsOptional()
  @IsString()
  howYouGotToKnowUs?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/demo/image/upload/v1/avatar.jpg' })
  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @ApiPropertyOptional({ example: '1995-05-15' })
  @IsOptional()
  @IsDateString()
  dob?: Date;

  @ApiPropertyOptional({ example: 'male' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 'Lagos, Nigeria' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'Software Engineer' })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiPropertyOptional({ example: 'user' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: '123456' })
  @IsOptional()
  @IsString()
  otp?: string;

  @ApiPropertyOptional({ example: '2026-08-24T22:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  otpExpiresAt?: Date;

  @ApiPropertyOptional({ example: 'DISABLED' })
  @IsOptional()
  @IsString()
  twoFactorAuth?: string;

  @ApiPropertyOptional({ example: '2026-08-24T21:00:00.000Z' })
  @IsOptional()
  @IsString()
  lastLogin?: string;

  @ApiPropertyOptional({ example: '127.0.0.1' })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiPropertyOptional({ example: 'Mozilla/5.0...' })
  @IsOptional()
  @IsString()
  browserAgent?: string;

  @ApiPropertyOptional({ example: 'PRO' })
  @IsOptional()
  @IsString()
  subscriptionPlan?: string;

  @ApiPropertyOptional({ example: '2026-12-31' })
  @IsOptional()
  @IsString()
  subscriptionPlanExpireAt?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  billingId?: number;

  @ApiPropertyOptional({ example: 'Passionate developer and researcher.' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'REF123456' })
  @IsOptional()
  @IsString()
  referralCode?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  softDelete?: boolean;

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  hasOnboarded?: boolean;

  @ApiPropertyOptional({ example: '25-34' })
  @IsOptional()
  @IsString()
  ageGroup?: string;

  @ApiPropertyOptional({ example: '123456' })
  @IsOptional()
  @IsString()
  resetOtp?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiPropertyOptional({ example: '2026-08-24T22:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  resetOtpExpiresAt?: Date;
}
