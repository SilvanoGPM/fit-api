import { RefreshToken } from '@app/entities/refresh-token';
import { User } from '@app/entities/user';

import { Page, Pageable } from './pages.type';

interface Payload {
  sub: string;
}

export abstract class RefreshTokenRepository {
  abstract findManyByUser(
    user: User,
    pageable: Pageable,
  ): Promise<Page<RefreshToken>>;

  abstract findByToken(token: string): Promise<RefreshToken | null>;
  abstract create(refreshToken: RefreshToken): Promise<void>;
  abstract delete(refreshToken: RefreshToken): Promise<void>;

  abstract sign(payload: Payload): Promise<string>;
  abstract verify(token: string): Promise<Payload>;

  abstract validateUser(email: string, password: string): Promise<User | null>;
}
