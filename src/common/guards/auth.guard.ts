import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('No authorization header');

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid token format');

    try {
      // ✅ Replace 'your_jwt_secret' with your actual secret
      const payload = jwt.decode(token);
      jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      // Inactivity timeout check
      const now = Date.now();
      if (typeof payload === 'object' && payload && 'lastActivity' in payload) {
        if (payload.lastActivity && now - payload.lastActivity > 1800 * 60 * 1000) {
          throw new UnauthorizedException('Session expired due to inactivity');
        }
      }
      request.user = payload; // attach user info to request
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
