import { User } from '@prisma/client';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<string>;
  abstract create(user: User): Promise<void>;
}
