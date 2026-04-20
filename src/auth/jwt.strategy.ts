import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { jwtConstants } from 'src/common/decorators/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    } as StrategyOptions);
  }

  async validate(payload: any) {
    // console.log('JwtStrategy Payload:', payload);

    // Inactivity timeout check (30 minutes)
    const now = Date.now();
    if (
      payload.lastActivity &&
      now - payload.lastActivity > 1800 * 60 * 1000
    ) {
      throw new UnauthorizedException('Session expired due to inactivity');
    }

    // payload contains what we signed (e.g. { sub: userId, email, role })
    // This value is attached to req.user by passport
    return {
      userId: payload.sub,
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
