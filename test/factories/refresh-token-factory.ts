import {
  CreateRefreshTokenProps,
  RefreshToken,
} from '@app/entities/refresh-token';

import { makeUser } from './user-factory';

export function makeRefreshToken(
  refreshToken: Partial<CreateRefreshTokenProps> = {},
) {
  return new RefreshToken({
    id: refreshToken.id ?? 'test-id',
    createdAt: refreshToken.createdAt ?? 'test-created-at',
    updatedAt: refreshToken.updatedAt ?? 'test-updated-at',
    token: refreshToken.token ?? 'test-token',
    browser: refreshToken.browser ?? 'test-browser',
    os: refreshToken.os ?? 'test-os',
    user: refreshToken.user ?? makeUser(),
  });
}
