import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
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
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        otp,
        otpExpiresAt,
      },
    });

    // send OTP via email
    const mailDetails = {
      to: dto.email,
      subject: 'Verify your email',
      text: `Your OTP is: ${otp}`
    }
    await sendEmail(mailDetails);

    return { message: 'User registered. Please verify email with OTP sent to your inbox.' };
  }


  async verifyEmail(email: string, otp: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    if (user.emailVerifiedAt) {
      throw new BadRequestException('Email already verified');
    }

    if (!user.otp || !user.otpExpiresAt) {
      throw new BadRequestException('No OTP found, please request again');
    }

    if (user.otpExpiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    if (user.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.prisma.user.update({
      where: { email },
      data: {
        emailVerifiedAt: new Date(),
        otp: null,
        otpExpiresAt: null,
      },
    });

    return { message: 'Email verified successfully' };
  }


  async login(dto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = await this.signToken(user.id, user.email, user.role);
    return { user, accessToken: token };
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        billing: true,         // 1:1 relation
        surveyInterest: true, // 1:M
        createdTickets: true,         // 1:M
        assignedTickets: true,         // 1:M
        payment: true,        // 1:M
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 🔒 remove sensitive fields
    const { password, otp, otpExpiresAt, ...safeUser } = user;
    return safeUser;
  }



  // -------- GOOGLE OAUTH --------
  async validateOAuthLogin(profile: any) {
    const { email, firstName, lastName, provider, providerId, profilePhoto } =
      profile;

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
          // optional provider fields
        },
      });
    }

    const token = await this.signToken(user.id, user.email, user.role);
    return { user, accessToken: token };
  }

  async updateAccount(id: string, updateDto: UpdateAuthDto) {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: updateDto,
    });
  }

  async softDeleteAccount(id: string) {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: { softDelete: true },
    });
  }

  async hardDeleteAccount(id: string) {
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }


  // -------- HELPER --------
  async signToken(userId: number, email: string, role: string): Promise<string> {
    return this.jwtService.signAsync({ sub: userId, email, role });
  }

}
