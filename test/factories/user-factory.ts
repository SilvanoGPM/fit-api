import { User, UserProps } from '@app/entities/user';

export function makeUser(user: Partial<UserProps> = {}) {
  return new User({
    email: user.email ?? 'test-email',
    name: user.name ?? 'test-name',
    role: user.role ?? 'test-role',
  });
}
