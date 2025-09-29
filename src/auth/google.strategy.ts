import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback` || 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  // profile contains user info from Google
  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    try {
      const { id, provider, emails, name, photos } = profile;
      const email = emails && emails[0]?.value;
      const userProfile = {
        providerId: id,
        provider,
        email,
        firstName: name?.givenName || '',
        lastName: name?.familyName || '',
        profilePhoto: photos && photos[0]?.value,
      };

      // authService will find or create user and return a user object
      const user = await this.authService.validateOAuthLogin(userProfile);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
