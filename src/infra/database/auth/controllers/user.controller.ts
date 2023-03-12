import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

import { JwtAuthGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../guards/current-user.guard';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Get('hash/:password')
  async hash(@Param('password') passwordToHash: string) {
    const password = await hash(passwordToHash, 10);

    return { password };
  }
}
