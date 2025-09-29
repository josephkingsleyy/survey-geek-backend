import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';
import { CreateAuthDto, LoginAuthDto, VerifyEmailDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: CreateAuthDto) {
    return this.authService.signup(signupDto);
  }

  @Public()
  @Post('verify-email')
  async verifyEmail(@Body() body: VerifyEmailDto) {
    return this.authService.verifyEmail(body.email, body.otp);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser('sub') userId: number) {
    return this.authService.getProfile(userId);
  }

  @Patch(':id')
  async updateAccount(
    @Param('id') id: string,
    @Body() updateDto: UpdateAuthDto,
  ) {
    return this.authService.updateAccount(id, updateDto);
  }

  // --- Soft delete account (mark as inactive)
  @Delete('soft/:id')
  async softDeleteAccount(@Param('id') id: string) {
    return this.authService.softDeleteAccount(id);
  }

  // --- Hard delete account (remove from DB)
  @Delete('hard/:id')
  async hardDeleteAccount(@Param('id') id: string) {
    return this.authService.hardDeleteAccount(id);
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
