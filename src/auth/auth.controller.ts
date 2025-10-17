import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';
import { ChangePasswordDto, CreateAuthDto, ForgotPasswordDto, LoginAuthDto, ResetPasswordDto, VerifyEmailDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: CreateAuthDto,
    @Req() req: Request) {
    const userAgent = req.headers['user-agent'] || 'unknown';
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
    return this.authService.signup(signupDto, { ip, userAgent });
  }

  @Public()
  @Post('verify-email')
  async verifyEmail(@Body() body: VerifyEmailDto) {
    return this.authService.verifyEmail(body.email, body.otp);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginAuthDto,
    @Req() req: Request) {
    const userAgent = req.headers['user-agent'] || 'unknown';

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
    return this.authService.login(loginDto, { ip, userAgent });
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser('userId') userId: number) {
    return this.authService.getProfile(userId);
  }

  @Patch('update')
  async updateAccount(
    @Body() updateDto: UpdateAuthDto,
    @CurrentUser('sub') sub: number,
  ) {
    return this.authService.updateAccount(sub, updateDto);
  }

  @Delete('soft')
  async softDeleteAccount(@Param('id') id: string,
    @CurrentUser('sub') sub: number,
  ) {
    return this.authService.softDeleteAccount(sub);
  }

  @Delete('undelete/:id')
  async undeleteAccount(@Param('id') id: string) {
    return this.authService.unDeleteAccount(Number(id));
  }

  // --- Hard delete account (remove from DB)
  @Delete('hard/:id')
  async hardDeleteAccount(@Param('id') id: string) {
    return this.authService.hardDeleteAccount(id);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.initiateForgotPassword(forgotPasswordDto.email);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.otp,
      resetPasswordDto.newPassword);
  }

  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser('sub') sub: number) {
    return this.authService.changePassword(
      sub,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const result = req.user; // comes from Google strategy validate()

    if (!result) {
      return res.redirect(`${process.env.FRONTEND_URL}/signin?error=oauth_failed`);
    }

    const token =
      result.accessToken ||
      (await this.authService.signToken(result.user.id, result.user.email, result.user.role));

    // ✅ Make sure your env variable is spelled correctly
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${token}`;

    return res.redirect(redirectUrl);
  }

  @Public()
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

}
