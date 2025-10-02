import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { sendEmail } from 'src/common/utils/mail-service';
import { UpdateAuthDto } from './dto/update-auth.dto';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async signup(dto: CreateAuthDto) {
    try {
      const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (existing) throw new BadRequestException('Email already registered');

      const hashed = await bcrypt.hash(dto.password, 10);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashed,
          otp,
          otpExpiresAt,
          role: dto.role,
        },
      });

      await sendEmail({
        to: dto.email,
        subject: 'Verify your email',
        text: `Your OTP is: ${otp}`,
      });

      return { message: 'User registered. Please verify email with OTP sent to your inbox.' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async verifyEmail(email: string, otp: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new BadRequestException('User not found');

      if (user.emailVerifiedAt) throw new BadRequestException('Email already verified');
      if (!user.otp || !user.otpExpiresAt) throw new BadRequestException('No OTP found, please request again');
      if (user.otpExpiresAt < new Date()) throw new BadRequestException('OTP expired');
      if (user.otp !== otp) throw new BadRequestException('Invalid OTP');

      await this.prisma.user.update({
        where: { email },
        data: { emailVerifiedAt: new Date(), otp: null, otpExpiresAt: null },
      });

      return { message: 'Email verified successfully' };
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException(err.message);
    }
  }

  async login(dto: LoginAuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email, softDelete: false },
      });

      if (!user) throw new UnauthorizedException('Invalid credentials');

      const valid = await bcrypt.compare(dto.password, user.password);
      if (!valid) throw new UnauthorizedException('Invalid credentials');

      const token = await this.signToken(user.id, user.email, user.role);
      return { data: user, accessToken: token };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      throw new InternalServerErrorException(err.message);
    }
  }

  async getProfile(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          billing: true,
          surveyInterest: true,
          createdTickets: true,
          assignedTickets: true,
          payment: true,
        },
      });

      if (!user) throw new UnauthorizedException('User not found');

      const { password, otp, otpExpiresAt, ...safeUser } = user;
      return { data: safeUser };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      throw new InternalServerErrorException(err.message);
    }
  }

  async validateOAuthLogin(profile: any) {
    try {
      const { email, firstName, lastName, profilePhoto } = profile;
      let user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            profilePhoto,
            role: 'user',
            emailVerifiedAt: new Date(),
          },
        });
      }

      const token = await this.signToken(user.id, user.email, user.role);
      return { user, accessToken: token };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateAccount(id: string, updateDto: UpdateAuthDto) {
    try {
      return await this.prisma.user.update({
        where: { id: Number(id) },
        data: updateDto,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async softDeleteAccount(id: string) {
    try {
      return await this.prisma.user.update({
        where: { id: Number(id) },
        data: { softDelete: true },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async hardDeleteAccount(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id: Number(id) },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async signToken(userId: number, email: string, role: string): Promise<string> {
    try {
      return this.jwtService.signAsync({ sub: userId, email, role });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
