import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private roles: string[] = []) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error: any, user) {
    if (error || !user) {
      throw new UnauthorizedException('Unauthorized', {
        cause: error ?? new Error(),
        description: error ? error.message : 'User invalid',
      });
    }

    const hasPermission =
      this.roles.length === 0 || this.roles.some((role) => role === user.role);

    if (!hasPermission) {
      throw new ForbiddenException('Forbidden', {
        cause: new Error(),
        description: 'Insufficient permission',
      });
    }

    return user;
  }
}
