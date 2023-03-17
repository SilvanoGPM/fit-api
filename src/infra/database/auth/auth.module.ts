import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/refresh.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [PrismaService, AuthService, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController, UserController],
})
export class AuthModule {}
