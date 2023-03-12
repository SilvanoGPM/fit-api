import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { TokenExpiredError } from './errors/token-expired.error';

interface UserDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    const isSamePassword = user && (await compare(password, user.password));

    if (!isSamePassword) {
      return null;
    }

    return user;
  }

  async generateAccessToken(user: User) {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    });
  }

  async generateRefreshToken(user: User) {
    const payload = { sub: user.id };

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    });

    await this.prisma.refreshToken.create({
      data: { token, userId: user.id },
    });

    return token;
  }

  async getRefreshToken(token: string) {
    return this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async deleteRefreshToken(token: string) {
    await this.prisma.refreshToken.delete({ where: { token } });
  }

  private verifyRefreshToken(token: string) {
    try {
      const { sub: userId } = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return userId as string;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new TokenExpiredError(error.expiredAt);
      }

      throw error;
    }
  }

  async refreshAccessToken(token: string) {
    const userId = this.verifyRefreshToken(token);

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
    });

    const tokenIsValid = refreshToken && refreshToken.userId === userId;

    if (!tokenIsValid) {
      throw new Error('Invalid token');
    }

    await this.prisma.refreshToken.delete({ where: { token } });

    return this.generateAccessToken(user);
  }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto.email, userDto.password);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }
}
