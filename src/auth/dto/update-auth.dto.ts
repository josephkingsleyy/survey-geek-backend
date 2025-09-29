import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsString, IsEmail, IsOptional, IsBoolean, IsDateString, IsInt, Length, IsNumberString } from 'class-validator';

export class UpdateAuthDto {
    @IsEmail()
    email: string;

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
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    alternatePhoneNumber?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    state?: string;

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
    @IsString()
    countryCode?: string;

    @IsOptional()
    @IsString()
    stateCode?: string;

    @IsOptional()
    @IsString()
    subDivisionCode?: string;

    @IsOptional()
    @IsString()
    subDivisionName?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsBoolean()
    hasOnboarded?: boolean;
}
