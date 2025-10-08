import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // User object attached by JwtAuthGuard

    if (!user || !user.isAdmin) {
      throw new ForbiddenException('User does not have administrator privileges.');
    }

    return true;
  }
}
