import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { Roles } from './guards/roles/roles.decorator';
import { Role } from './users/enum/role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles(Role.Student, Role.Admin) // Only users with the 'Student' or 'Admin' role can access this route
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/test')
  getTest(): string {
    return this.appService.getTest();
  }
}
