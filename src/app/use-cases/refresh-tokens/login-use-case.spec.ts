import {
  makeRefreshToken,
  makeRepository,
} from '@test/factories/refresh-token-factory';

import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { CreateRefreshTokenUseCase } from './create-refresh-token-use-case';
import { GenerateAccessTokenUseCase } from './generate-access-token-use-case';
import { LoginUseCase } from './login-use-case';

describe('Login use case', () => {
  it('should be able to login', async () => {
    const initialToken = makeRefreshToken();

    const refreshTokenRepository = makeRepository([initialToken]);

    const createRefreshToken = new CreateRefreshTokenUseCase(
      refreshTokenRepository,
    );

    const generateAccessToken = new GenerateAccessTokenUseCase(
      refreshTokenRepository,
    );

    const login = new LoginUseCase(
      refreshTokenRepository,
      createRefreshToken,
      generateAccessToken,
    );

    const params = {
      email: initialToken.user.email,
      password: 'test1234',
    };

    const { accessToken, refreshToken } = await login.execute(params);

    expect(accessToken).toEqual(initialToken.user.id);
    expect(refreshToken).toEqual(initialToken.user.id);
  });

  it('should not be able to login when email or password is incorrect', async () => {
    const refreshTokenRepository = makeRepository();

    const createRefreshToken = new CreateRefreshTokenUseCase(
      refreshTokenRepository,
    );

    const generateAccessToken = new GenerateAccessTokenUseCase(
      refreshTokenRepository,
    );

    const login = new LoginUseCase(
      refreshTokenRepository,
      createRefreshToken,
      generateAccessToken,
    );

    const params = {
      email: 'random@mail.com',
      password: 'test1234',
    };

    expect(() => {
      return login.execute(params);
    }).rejects.toThrow(InvalidCredentialsError);
  });
});
