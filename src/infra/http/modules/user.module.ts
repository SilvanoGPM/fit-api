import { Module } from '@nestjs/common';

import { GetAllUsersUseCase } from '@app/use-cases/users/get-all-users-use-case';
import { GetUserByEmailUseCase } from '@app/use-cases/users/get-user-by-email-use-case';
import { CreateUserUseCase } from '@app/use-cases/users/create-user-use-case';
import { UserExistsByEmailUseCase } from '@app/use-cases/users/user-exists-by-email-use-case';
import { GetUserByIdUseCase } from '@app/use-cases/users/get-user-by-id-use-case';
import { ReplaceUserUseCase } from '@app/use-cases/users/replace-user-use-case';
import { PromoteUserUseCase } from '@app/use-cases/users/promote-user-use-case';

import { GenericModule } from './generic.module';

export const cases = [
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
  CreateUserUseCase,
  UserExistsByEmailUseCase,
  ReplaceUserUseCase,
  PromoteUserUseCase,
];

@Module({
  imports: [GenericModule],
  providers: cases,
  exports: cases,
})
export class UserModule {}
