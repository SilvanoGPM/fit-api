import { Injectable } from '@nestjs/common';

import { RefreshTokenRepository } from '@app/repositories/refresh-token-repository';

import { GetRefreshTokenByTokenUseCase } from './get-refresh-token-by-token-use-case';

@Injectable()
export class RevokeRefreshTokenUseCase {
  constructor(
    private refreshTokenRepository: RefreshTokenRepository,
    private getRefreshTokenByToken: GetRefreshTokenByTokenUseCase,
  ) {}

  async execute(token: string) {
    const { refreshToken } = await this.getRefreshTokenByToken.execute(token);

    await this.refreshTokenRepository.delete(refreshToken);
  }
}
