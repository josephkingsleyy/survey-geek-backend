import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    // Build options first with proper type
    const options: StrategyOptionsWithRequest = {
      clientID: process.env.GOOGLE_CLIENT_ID || '', // fallback empty string
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '', // fallback
      callbackURL: process.env.BACKEND_URL
        ? `${process.env.BACKEND_URL}/auth/google/callback`
        : 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: true,
    };

    super(options); // pass typed options to PassportStrategy
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    try {
      const email = profile.emails?.[0]?.value;
      const userProfile = {
        providerId: profile.id,
        provider: profile.provider,
        email,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        profilePhoto: profile.photos?.[0]?.value,
      };

      const user = await this.authService.validateOAuthLogin(userProfile);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
