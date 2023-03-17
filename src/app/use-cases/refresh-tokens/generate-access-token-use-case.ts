import { Injectable } from '@nestjs/common';

import { RefreshTokenRepository } from '@app/repositories/refresh-token-repository';

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute(userId: string) {
    const accessToken = await this.refreshTokenRepository.sign({ sub: userId });

    return { accessToken };
  }
}
