import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/enum/role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    );
  

    // No @Roles() → any authenticated user can access
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // AuthGuard already put the user here
    const user = request.user;
    const hasRole = requiredRoles.some((role) =>
      user?.role?.includes(role),
    );

    if (!hasRole) {
      throw new ForbiddenException({
        success: false,
        message: 'You do not have permission to access this resource',
      });
    }

    return true;
  }
}
