import { Injectable } from '@nestjs/common';

import { RefreshTokenRepository } from '@app/repositories/refresh-token-repository';

import { GenerateAccessTokenUseCase } from './generate-access-token-use-case';
import { GetRefreshTokenByTokenUseCase } from './get-refresh-token-by-token-use-case';
import { GetUserByIdUseCase } from '../users/get-user-by-id-use-case';
import { InvalidTokenError } from '../errors/invalid-token.error';

@Injectable()
export class RefreshAccessTokenUseCase {
  constructor(
    private refreshTokenRepository: RefreshTokenRepository,
    private getUserById: GetUserByIdUseCase,
    private getRefreshTokenByToken: GetRefreshTokenByTokenUseCase,
    private generateAccessToken: GenerateAccessTokenUseCase,
  ) {}

  async execute(actualRefreshToken: string) {
    const { sub: userId } = await this.refreshTokenRepository.verify(
      actualRefreshToken,
    );

    const { user } = await this.getUserById.execute(userId);

    const { refreshToken } = await this.getRefreshTokenByToken.execute(
      actualRefreshToken,
    );

    const tokenIsValid = refreshToken.user.id === userId;

    if (!tokenIsValid) {
      throw new InvalidTokenError();
    }

    return this.generateAccessToken.execute(user.id);
  }
}
