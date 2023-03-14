import { User, CreateUserProps } from '@app/entities/user';

export function makeUser(user: Partial<CreateUserProps> = {}) {
  return new User({
    id: user.id ?? 'test-id',
    createdAt: user.createdAt ?? 'test-created-at',
    updatedAt: user.updatedAt ?? 'test-updated-at',
    email: user.email ?? 'test-email',
    name: user.name ?? 'test-name',
    role: user.role ?? 'test-role',
  });
}
