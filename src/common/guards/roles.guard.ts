import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // console.log('--- RolesGuard Debug ---');
    // console.trace('RolesGuard Execution Trace');
    // console.log('Request Method:', request.method);
    // console.log('Request URL:', request.url);
    // console.log('All Request Keys:', Object.keys(request).filter(k => !k.startsWith('_')));
    // console.log('RolesGuard - Required Roles:', roles);
    // console.log('RolesGuard - User found in request.user:', user);

    if (!user || !user.role) {
      // console.warn('RolesGuard - FAILED: No user or role found on request');
      throw new ForbiddenException('No user or role found on request');
    }

    if (!roles.includes(user.role)) {
      // console.warn(`RolesGuard - Access Denied for role: ${user.role}`);
      throw new ForbiddenException(
        `User role "${user.role}" does not have access`,
      );
    }

    return true;
  }
}
