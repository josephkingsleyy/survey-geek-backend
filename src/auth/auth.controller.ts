import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';
import {
  ChangePasswordDto,
  CreateAuthDto,
  ForgotPasswordDto,
  LoginAuthDto,
  ResetPasswordDto,
  SendOtpDto,
  ResendOtpDto,
  VerifyEmailDto,
  VerifyOtpDto,
} from './dto/create-auth.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationDto } from 'src/ticket/dto/update-ticket.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ status: 201, description: 'User account created successfully.' })
  @Public()
  @Post('signup')
  async signup(@Body() signupDto: CreateAuthDto, @Req() req: Request) {
    const userAgent = req.headers['user-agent'] || 'unknown';
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
    return this.authService.signup(signupDto, { ip, userAgent });
  }

  @ApiOperation({ summary: 'Verify email address with OTP' })
  @Public()
  @Post('verify-email')
  async verifyEmail(@Body() body: VerifyEmailDto) {
    return this.authService.verifyEmail(body.email, body.otp);
  }

  @ApiOperation({ summary: 'Send OTP for verification' })
  @Public()
  @Post('send-otp')
  async sendOtp(@Body() body: SendOtpDto) {
    return this.authService.sendOtp(body.email);
  }

  @ApiOperation({ summary: 'Resend verification OTP' })
  @Public()
  @Post('resend-otp')
  async resendOtp(@Body() body: ResendOtpDto) {
    return this.authService.resendOtp(body.email);
  }

  @ApiOperation({ summary: 'Verify general OTP' })
  @Public()
  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  @ApiOperation({ summary: 'Social login validate OAuth' })
  @Public()
  @Post('social-login')
  async socialLogin(@Body() body: any) {
    return this.authService.validateOAuthLogin(body);
  }

  @ApiOperation({ summary: 'Log in to user account' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginAuthDto, @Req() req: Request) {
    const userAgent = req.headers['user-agent'] || 'unknown';

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
    return this.authService.login(loginDto, { ip, userAgent });
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser('userId') userId: number) {
    return this.authService.getProfile(userId);
  }

  @ApiOperation({ summary: 'Get user statistics (Admin/Analytics)' })
  @Get('users/statistics')
  async getUsersStatistics() {
    return this.authService.getUsersStatistics();
  }

  @ApiOperation({ summary: 'Update authenticated user account profile' })
  @ApiBearerAuth()
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async updateAccount(
    @Body() updateDto: UpdateAuthDto,
    @CurrentUser('userId') userId: number,
  ) {
    return this.authService.updateAccount(userId, updateDto);
  }

  @ApiOperation({ summary: 'Update user role (Admin)' })
  @ApiBearerAuth()
  @Patch('update-role')
  @UseGuards(JwtAuthGuard)
  async updateRole(@Body() updateRoleDto: UpdateRoleDto) {
    return this.authService.updateRole(
      updateRoleDto.userId,
      updateRoleDto.role,
    );
  }

  @ApiOperation({ summary: 'Soft delete account' })
  @ApiBearerAuth()
  @Delete('soft')
  async softDeleteAccount(
    @Param('id') id: string,
    @CurrentUser('userId') userId: number,
  ) {
    return this.authService.softDeleteAccount(userId);
  }

  @ApiOperation({ summary: 'Undelete soft-deleted account' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Delete('undelete/:id')
  async undeleteAccount(@Param('id') id: string) {
    return this.authService.unDeleteAccount(Number(id));
  }

  @ApiOperation({ summary: 'Hard delete account permanently' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Delete('hard/:id')
  async hardDeleteAccount(@Param('id') id: string) {
    return this.authService.hardDeleteAccount(id);
  }

  @ApiOperation({ summary: 'Initiate forgot password OTP' })
  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.initiateForgotPassword(forgotPasswordDto.email);
  }

  @ApiOperation({ summary: 'Reset password with OTP' })
  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.otp,
      resetPasswordDto.newPassword,
    );
  }

  @ApiOperation({ summary: 'Change password for logged-in user' })
  @ApiBearerAuth()
  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser('sub') sub: number,
  ) {
    return this.authService.changePassword(
      sub,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @ApiOperation({ summary: 'Initiate Google OAuth2 authentication' })
  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Guard redirects to Google
  }

  @ApiOperation({ summary: 'Google OAuth2 callback redirect' })
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const result = req.user;

    if (!result) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/signin?error=oauth_failed`,
      );
    }

    const token =
      result.accessToken ||
      (await this.authService.signToken(
        result.user.id,
        result.user.email,
        result.user.role,
      ));

    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${token}`;

    return res.redirect(redirectUrl);
  }

  @ApiOperation({ summary: 'Get list of all users' })
  @Public()
  @Get('all-users')
  async getAllUsers(@Query() pagination: PaginationDto) {
    return this.authService.getAllUsers(pagination);
  }

  @ApiOperation({ summary: 'Healthcheck route' })
  @Public()
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
