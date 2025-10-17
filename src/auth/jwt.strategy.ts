import { Injectable } from '@nestjs/common';
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
    // payload contains what we signed (e.g. { sub: userId, email })
    // This value is attached to req.user by passport
    return { userId: payload.sub, email: payload.email };
  }
}
