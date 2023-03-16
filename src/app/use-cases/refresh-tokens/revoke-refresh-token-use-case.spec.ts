import {
  generateRefreshTokens,
  makeRepository,
} from '@test/factories/refresh-token-factory';

import { GetRefreshTokenByTokenUseCase } from './get-refresh-token-by-token-use-case';
import { RevokeRefreshTokenUseCase } from './revoke-refresh-token-use-case';

describe('RevokeRefreshToken use case', () => {
  it('should be able to delete refresh token', async () => {
    const TOTAL_ELEMENTS = 100;

    const repositoryData = generateRefreshTokens(TOTAL_ELEMENTS);

    const refreshTokenRepository = makeRepository(repositoryData);

    const getRefreshTokenByToken = new GetRefreshTokenByTokenUseCase(
      refreshTokenRepository,
    );

    const revokeRefreshToken = new RevokeRefreshTokenUseCase(
      refreshTokenRepository,
      getRefreshTokenByToken,
    );

    const refreshToken = repositoryData[0];

    await revokeRefreshToken.execute(refreshToken.token);

    expect(refreshTokenRepository.refreshTokens.length).toEqual(
      TOTAL_ELEMENTS - 1,
    );

    expect(refreshTokenRepository.refreshTokens[0]).not.toEqual(refreshToken);
  });
});
