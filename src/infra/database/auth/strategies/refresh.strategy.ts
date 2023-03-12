import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infra/database/prisma/prisma.service';

import { RefreshToken } from '.prisma/client';
import { AuthService } from '../auth.service';

interface JwtPayload {
  sub: string;
  jti: string;
}

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private authService: AuthService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<RefreshToken> {
    const refreshToken = await this.authService.getRefreshToken(payload.sub);

    if (!refreshToken || refreshToken.token !== payload.jti) {
      throw new Error('Invalid token');
    }

    return refreshToken;
  }
}
