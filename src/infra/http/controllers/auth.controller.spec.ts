import { UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';

import {
  generateRefreshTokens,
  makeRefreshToken,
  makeRepository as makeRefreshTokenRepository,
} from '@test/factories/refresh-token-factory';

import { makeRepository as makeUserRepository } from '@test/factories/user-factory';
import { RefreshTokenRepository } from '@app/repositories/refresh-token-repository';
import { RefreshAccessTokenUseCase } from '@app/use-cases/refresh-tokens/refresh-access-token-use-case';
import { LoginUseCase } from '@app/use-cases/refresh-tokens/login-use-case';
import { CreateRefreshTokenUseCase } from '@app/use-cases/refresh-tokens/create-refresh-token-use-case';
import { GenerateAccessTokenUseCase } from '@app/use-cases/refresh-tokens/generate-access-token-use-case';
import { GetRefreshTokenByTokenUseCase } from '@app/use-cases/refresh-tokens/get-refresh-token-by-token-use-case';
import { GetRefreshTokensByUserUseCase } from '@app/use-cases/refresh-tokens/get-refresh-tokens-by-user-use-case';
import { RevokeRefreshTokenUseCase } from '@app/use-cases/refresh-tokens/revoke-refresh-token-use-case';
import { GetRefreshTokenByIdUseCase } from '@app/use-cases/refresh-tokens/get-refresh-token-by-id-use-case';
import { ReplaceUserUseCase } from '@app/use-cases/users/replace-user-use-case';
import { PromoteUserUseCase } from '@app/use-cases/users/promote-user-use-case';
import { RefreshToken } from '@app/entities/refresh-token';
import { makeUser } from '@test/factories/user-factory';
import { GetUserByIdUseCase } from '@app/use-cases/users/get-user-by-id-use-case';
import { GetUserByEmailUseCase } from '@app/use-cases/users/get-user-by-email-use-case';
import { UserRepository } from '@app/repositories/user-repository';
import { TokenExpiredError } from '@infra/database/prisma/errors/token-expired.error';

import { GenericService } from '../services/generic.service';
import { AuthController } from './auth.controller';
import { RefreshTokenExpiredError } from '../errors/refresh-token-expired.error';
import { RefreshTokenNotFoundError } from '../errors/refresh-token-not-found.error';

describe('AuthController', () => {
  const refreshTokenRepository = makeRefreshTokenRepository();
  const userRepository = makeUserRepository();

  let authController: AuthController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: RefreshTokenRepository,
          useValue: refreshTokenRepository,
        },

        {
          provide: UserRepository,
          useValue: userRepository,
        },

        GenericService,
        GetUserByIdUseCase,
        GetUserByEmailUseCase,
        LoginUseCase,
        RefreshAccessTokenUseCase,
        CreateRefreshTokenUseCase,
        GenerateAccessTokenUseCase,
        GetRefreshTokenByTokenUseCase,
        GetRefreshTokenByIdUseCase,
        GetRefreshTokensByUserUseCase,
        RevokeRefreshTokenUseCase,
        ReplaceUserUseCase,
        PromoteUserUseCase,
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  afterEach(() => {
    refreshTokenRepository.refreshTokens = [];
    userRepository.users = [];
  });

  describe('getAllTokens', () => {
    it('should be able to get all user refresh tokens with pagination', async () => {
      const user = makeUser();

      refreshTokenRepository.refreshTokens.push(makeRefreshToken({ user }));
      userRepository.users.push(user);

      const params = {
        page: 1,
        size: 10,
      };

      const tokens = await authController.getAllTokens(user, params);

      expect(tokens).toBeTruthy();
      expect(tokens.hasNext).toBeFalsy();
      expect(tokens.page).toEqual(params.page);
      expect(tokens.size).toEqual(params.size);
      expect(tokens.total).toEqual(1);

      expect(tokens.data).toHaveLength(1);
      expect(tokens.data[0]).toBeInstanceOf(RefreshToken);

      expect(tokens.data[0].user).toEqual(user);
    });
  });

  describe('login', () => {
    it('should be able to login', async () => {
      const user = makeUser();
      const initialToken = makeRefreshToken({ user });

      refreshTokenRepository.refreshTokens.push(initialToken);
      userRepository.users.push(user);

      const requestMock = {
        headers: {
          'user-agent': 'Unkwnon',
        },
      } as Request;

      const { accessToken, refreshToken, name, role, email } =
        await authController.login(
          {
            email: user.email,
            password: user.password,
          },
          requestMock,
        );

      expect(accessToken).toEqual(initialToken.user.id);
      expect(refreshToken).toEqual(initialToken.user.id);
      expect(name).toEqual(initialToken.user.name);
      expect(email).toEqual(initialToken.user.email);
      expect(role).toEqual(initialToken.user.role);
    });

    it('should not be able to login when email or password is incorrect', async () => {
      const requestMock = {
        headers: {
          'user-agent': 'Unkwnon',
        },
      } as Request;

      expect(() => {
        return authController.login(
          {
            email: 'random-email',
            password: 'random-pass',
          },
          requestMock,
        );
      }).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    it('should be able to refresh access token', async () => {
      const initialUser = makeUser({ id: 'new-user-id' });

      const initialToken = makeRefreshToken({
        user: initialUser,
      });

      refreshTokenRepository.refreshTokens.push(initialToken);
      userRepository.users.push(initialUser);

      const { accessToken } = await authController.refresh({
        token: initialToken.token,
      });

      expect(accessToken).toEqual(initialUser.id);
    });

    it('should not be able to refresh access token when user is invalid', async () => {
      expect(() => {
        return authController.refresh({
          token: 'random-token',
        });
      }).rejects.toThrow(UnauthorizedException);
    });

    it('should not be able to refresh access token when refresh token is expired', async () => {
      refreshTokenRepository.verify = async () => {
        throw new TokenExpiredError(new Date().toString());
      };

      expect(() => {
        return authController.refresh({
          token: 'random-token',
        });
      }).rejects.toThrow(RefreshTokenExpiredError);
    });
  });

  describe('remove', () => {
    it('should be able to delete refresh token', async () => {
      const TOTAL_ELEMENTS = 100;

      refreshTokenRepository.refreshTokens =
        generateRefreshTokens(TOTAL_ELEMENTS);

      const refreshToken = refreshTokenRepository.refreshTokens[0];

      await authController.revoke(makeUser(), refreshToken.id);

      expect(refreshTokenRepository.refreshTokens).toHaveLength(
        TOTAL_ELEMENTS - 1,
      );

      expect(refreshTokenRepository.refreshTokens[0]).not.toEqual(refreshToken);
    });

    it('should not be able to delete refresh token when user not is owner', async () => {
      const TOTAL_ELEMENTS = 100;

      refreshTokenRepository.refreshTokens =
        generateRefreshTokens(TOTAL_ELEMENTS);

      const refreshToken = refreshTokenRepository.refreshTokens[0];

      expect(() => {
        return authController.revoke(
          makeUser({ email: 'otheruser@mail.com' }),
          refreshToken.id,
        );
      }).rejects.toThrow(ForbiddenException);
    });

    it('should not be able to delete refresh token when it does not exists', async () => {
      expect(() => {
        return authController.revoke(makeUser(), 'random-id');
      }).rejects.toThrow(RefreshTokenNotFoundError);
    });
  });
});
