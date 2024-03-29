import { Module } from '@nestjs/common';

import { RefreshAccessTokenUseCase } from '@app/use-cases/refresh-tokens/refresh-access-token-use-case';
import { LoginUseCase } from '@app/use-cases/refresh-tokens/login-use-case';
import { CreateRefreshTokenUseCase } from '@app/use-cases/refresh-tokens/create-refresh-token-use-case';
import { GenerateAccessTokenUseCase } from '@app/use-cases/refresh-tokens/generate-access-token-use-case';
import { GetRefreshTokenByTokenUseCase } from '@app/use-cases/refresh-tokens/get-refresh-token-by-token-use-case';
import { GetRefreshTokensByUserUseCase } from '@app/use-cases/refresh-tokens/get-refresh-tokens-by-user-use-case';
import { RevokeRefreshTokenUseCase } from '@app/use-cases/refresh-tokens/revoke-refresh-token-use-case';
import { GetRefreshTokenByIdUseCase } from '@app/use-cases/refresh-tokens/get-refresh-token-by-id-use-case';

import { GenericModule } from './generic.module';

export const cases = [
  LoginUseCase,
  RefreshAccessTokenUseCase,
  CreateRefreshTokenUseCase,
  GenerateAccessTokenUseCase,
  GetRefreshTokenByTokenUseCase,
  GetRefreshTokenByIdUseCase,
  GetRefreshTokensByUserUseCase,
  RevokeRefreshTokenUseCase,
];

@Module({
  imports: [GenericModule],
  providers: cases,
  exports: cases,
})
export class RefreshTokenModule {}
