import {
  Body,
  Controller,
  UnauthorizedException,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from '../auth.service';
import { LoginDTO } from '../dtos/login.dto';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import { TokenExpiredError } from '../errors/token-expired.error';
import { RefreshTokenExpiredError } from './errors/refresh-token-expired.error';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDTO) {
    try {
      const tokens = await this.authService.login(loginDto);

      return tokens;
    } catch (error: any) {
      throw new UnauthorizedException('Unauthorized', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDTO) {
    try {
      const accessToken = await this.authService.refreshAccessToken(
        refreshTokenDto.token,
      );

      return { accessToken };
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new RefreshTokenExpiredError(error);
      } else {
        throw new UnauthorizedException('Unauthorized', {
          cause: error,
          description: error.message,
        });
      }
    }
  }
}
