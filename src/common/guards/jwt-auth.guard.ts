import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // console.log('--- JwtAuthGuard Start ---');
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        // console.log('JwtAuthGuard - Result:', result);
        // console.log('JwtAuthGuard - User on request after super:', !!request.user);
        return result;
    }
}
