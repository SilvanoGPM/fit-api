import { Injectable } from '@nestjs/common';

import { ReplaceUserUseCase } from './replace-user-use-case';
import { GetUserByIdUseCase } from './get-user-by-id-use-case';

@Injectable()
export class PromoteUserUseCase {
  constructor(
    private replaceUser: ReplaceUserUseCase,
    private getUserById: GetUserByIdUseCase,
  ) {}

  async execute(id: string, role: string) {
    const { user } = await this.getUserById.execute(id);

    const { email, name, password } = user;

    await this.replaceUser.execute({
      id,
      email,
      name,
      password,
      role,
    });
  }
}
