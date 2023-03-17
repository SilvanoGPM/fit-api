import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';

import { Pageable } from '@app/repositories/pages.type';
import { GetAllUsersUseCase } from '@app/use-cases/users/get-all-users-use-case';

import { GenericService } from '../services/generic.service';
import { GetUserByEmailUseCase } from '@app/use-cases/users/get-user-by-email-use-case';
import { UserFoodNotFoundError } from '../errors/user-not-found.error';
import { UserExistsByEmailUseCase } from '@app/use-cases/users/user-exists-by-email-use-case';
import { CreateUserUseCase } from '@app/use-cases/users/create-user-use-case';
import { CreateUserDTO } from '../dtos/users/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private getAllUsers: GetAllUsersUseCase,
    private getUserByEmail: GetUserByEmailUseCase,
    private userExistsByEmail: UserExistsByEmailUseCase,
    private createUser: CreateUserUseCase,
    private genericService: GenericService,
  ) {}

  @Get()
  async getAll(@Query() query: Pageable) {
    const params = this.genericService.getPageParamsByQuery(query);

    const { users } = await this.getAllUsers.execute(params);

    return users;
  }

  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    try {
      const { user } = await this.getUserByEmail.execute(email);

      return { user };
    } catch (error) {
      throw new UserFoodNotFoundError(error);
    }
  }

  @Get(':email/exists')
  async existsByEmail(@Param('email') email: string) {
    const exists = await this.userExistsByEmail.execute(email);

    return { exists };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    const { email, password, name } = createUserDto;

    const user = await this.createUser.execute({
      email,
      password,
      name,
      role: 'user',
    });

    return { user };
  }
}
