import { RefreshToken } from '@app/entities/refresh-token';
import { User } from '@app/entities/user';
import { Pageable } from '@app/repositories/pages.type';
import { RefreshTokenRepository } from '@app/repositories/refresh-token-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  constructor(
    public refreshTokens: RefreshToken[] = [],
    private utils: RepositoryUtils<RefreshToken>,
  ) {}

  async findManyByUser(user: User, pageable: Pageable) {
    const tokens = this.refreshTokens.filter(
      (token) => token.user.email === user.email,
    );

    return this.utils.getPage({ data: tokens, ...pageable });
  }

  findByToken(token: string): Promise<RefreshToken | null> {
    throw new Error('Method not implemented.');
  }

  create(refreshToken: RefreshToken): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(refreshToken: RefreshToken): Promise<void> {
    throw new Error('Method not implemented.');
  }

  sign(payload: object, expiresIn: string | number): Promise<string> {
    throw new Error('Method not implemented.');
  }

  comparePassword(password1: string, password2: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
