import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { sendEmail } from 'src/common/utils/mail-service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PaginationDto } from 'src/common/utils/pagination.dto';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async signup(dto: CreateAuthDto, data: { ip: string, userAgent: string }) {
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
          role: dto.role || 'user',
          browserAgent: data.userAgent,
          ipAddress: data.ip,
          firstName: dto.firstName,
          lastName: dto.lastName,
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

  async login(dto: LoginAuthDto, data: { ip: string, userAgent: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email, softDelete: false },
        include: {
          surveyInterest: true,
        },
      });

      if (!user) throw new UnauthorizedException('Invalid credentials');

      if (!user.password) throw new UnauthorizedException('Invalid credentials');
      const valid = await bcrypt.compare(dto.password, user.password);
      if (!valid) throw new UnauthorizedException('Invalid credentials');

      // --- compare IP and browser agent ---
      const isNewDevice =
        user.ipAddress !== data.ip || user.browserAgent !== data.userAgent;

      if (isNewDevice) {
        // await sendEmail({
        //   to: user.email,
        //   subject: 'New Login Detected',
        //   text: `We noticed a login from a new device or browser.
        //           Details:
        //           - IP Address: ${data.ip}
        //           - Browser: ${data.userAgent}
        //           If this was you, no action is needed. Otherwise, please reset your password immediately.`,
        // });
        // 2️⃣ Update the stored info
        await this.prisma.user.update({
          where: { id: user.id },
          data: { ipAddress: data.ip, browserAgent: data.userAgent },
        });
      }

      if (!user.email || !user.role) {
        throw new InternalServerErrorException('User email or role is missing');
      }
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

      const token = await this.signToken(user.id, user.email, user.role || 'user');
      return { user, accessToken: token };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateAccount(userId: number, updateDto: UpdateAuthDto) {
    try {
      // Filter out sensitive fields that should not be updated by users
      const { role, billingId, softDelete, ...safeData } = updateDto;

      // Hash password if provided
      if (safeData.password) {
        safeData.password = await bcrypt.hash(safeData.password, 10);
      }

      return await this.prisma.user.update({
        where: { id: userId },
        data: safeData,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateRole(userId: number, role?: string) {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { role: role || 'user' },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async softDeleteAccount(id: number) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { softDelete: true },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  async unDeleteAccount(id: number) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { softDelete: false },
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

  async initiateForgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and expiry (e.g., 10 min)
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetOtp: otp,
        resetOtpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // Send OTP via email (your mailer service)
    await sendEmail({
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });

    return { message: 'OTP sent to email' };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    if (
      !user.resetOtp ||
      user.resetOtp !== otp ||
      !user.resetOtpExpiresAt ||
      new Date() > user.resetOtpExpiresAt
    ) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
        resetOtp: null,
        resetOtpExpiresAt: null,
      },
    });

    return { message: 'Password reset successful' };
  }


  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (!user.password) throw new UnauthorizedException('Password not set for this user');
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) throw new UnauthorizedException('Old password is incorrect');

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { message: 'Password changed successfully' };
  }


  async getAllUsers(pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
        where: { softDelete: false },
        include: {
          surveyInterest: true,
          billing: true,
          createdTickets: true,
          assignedTickets: true,
          payment: true,
        },
      }),
      this.prisma.user.count({ where: { softDelete: false } }),
    ]);

    return {
      data: users.map(({ password, otp, resetOtp, ...rest }) => rest),
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

}
