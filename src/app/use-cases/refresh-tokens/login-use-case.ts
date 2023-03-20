import { Injectable } from '@nestjs/common';

import { RefreshTokenRepository } from '@app/repositories/refresh-token-repository';

import { GenerateAccessTokenUseCase } from './generate-access-token-use-case';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { CreateRefreshTokenUseCase } from './create-refresh-token-use-case';

interface ExecuteParams {
  email: string;
  password: string;
  browser?: string;
  os?: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private refreshTokenRepository: RefreshTokenRepository,
    private createRefreshToken: CreateRefreshTokenUseCase,
    private generateAccessToken: GenerateAccessTokenUseCase,
  ) {}

  async execute({
    email,
    password,
    browser = 'Unknown',
    os = 'Unknown',
  }: ExecuteParams) {
    const user = await this.refreshTokenRepository.validateUser(
      email,
      password,
    );

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const { accessToken } = await this.generateAccessToken.execute(user.id);

    const refreshToken = await this.refreshTokenRepository.sign(
      {
        sub: user.id,
      },
      process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    );

    await this.createRefreshToken.execute({
      token: refreshToken,
      browser,
      os,
      user,
    });

    const { name, role } = user;

    return { accessToken, refreshToken, email, name, role };
  }
}
