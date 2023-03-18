import { Injectable } from '@nestjs/common';

import { RefreshTokenRepository } from '@app/repositories/refresh-token-repository';

import { GetRefreshTokenByIdUseCase } from './get-refresh-token-by-id-use-case';

@Injectable()
export class RevokeRefreshTokenUseCase {
  constructor(
    private refreshTokenRepository: RefreshTokenRepository,
    private getRefreshTokenById: GetRefreshTokenByIdUseCase,
  ) {}

  async execute(id: string) {
    const { refreshToken } = await this.getRefreshTokenById.execute(id);

    await this.refreshTokenRepository.delete(refreshToken);
  }
}
