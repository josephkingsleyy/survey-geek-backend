import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsInt,
} from 'class-validator';

export class UpdateAuthDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  emailVerifiedAt?: Date;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  phoneNumberDialCode?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  alternatePhoneNumberDialCode?: string;

  @IsOptional()
  @IsString()
  alternatePhoneNumber?: string;

  @IsOptional()
  @IsString()
  countryOfResidence?: string;

  @IsOptional()
  @IsString()
  countryOfNationality?: string;

  @IsOptional()
  @IsString()
  stateOfNationality?: string;

  @IsOptional()
  @IsString()
  stateOfResidence?: string;

  @IsOptional()
  @IsString()
  cityOfResidence?: string;

  @IsOptional()
  @IsString()
  cityOfNationality?: string;

  @IsOptional()
  @IsString()
  addressOfResidence?: string;

  @IsOptional()
  @IsString()
  addressOfNationality?: string;

  @IsOptional()
  @IsString()
  employmentStatus?: string;

  @IsOptional()
  @IsString()
  mostPreferredCommsChannel?: string;

  @IsOptional()
  @IsString()
  howYouGotToKnowUs?: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsOptional()
  @IsDateString()
  dob?: Date;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  otp?: string;

  @IsOptional()
  @IsDateString()
  otpExpiresAt?: Date;

  @IsOptional()
  @IsString()
  twoFactorAuth?: string;

  @IsOptional()
  @IsString()
  lastLogin?: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  browserAgent?: string;

  @IsOptional()
  @IsString()
  subscriptionPlan?: string;

  @IsOptional()
  @IsString()
  subscriptionPlanExpireAt?: string;

  @IsOptional()
  @IsInt()
  billingId?: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  referralCode?: string;

  @IsOptional()
  @IsBoolean()
  softDelete?: boolean;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsBoolean()
  hasOnboarded?: boolean;

  @IsOptional()
  @IsString()
  ageGroup?: string;

  @IsOptional()
  @IsString()
  resetOtp?: string;

  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsDateString()
  resetOtpExpiresAt?: Date;
}
