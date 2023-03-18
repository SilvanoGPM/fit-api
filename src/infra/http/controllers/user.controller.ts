import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  UseGuards,
  Patch,
  Put,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { Pageable } from '@app/repositories/pages.type';
import { GetAllUsersUseCase } from '@app/use-cases/users/get-all-users-use-case';
import { User } from '@app/entities/user';
import { CreateUserUseCase } from '@app/use-cases/users/create-user-use-case';
import { UserExistsByEmailUseCase } from '@app/use-cases/users/user-exists-by-email-use-case';
import { GetUserByEmailUseCase } from '@app/use-cases/users/get-user-by-email-use-case';

import { GenericService } from '../services/generic.service';
import { UserFoodNotFoundError } from '../errors/user-not-found.error';
import { CreateUserDTO } from '../dtos/users/create-user.dto';
import { CurrentUser } from '../auth/guards/current-user.guard';
import { IsUser } from '../auth/guards/is-user.guard';
import { IsAdmin } from '../auth/guards/is-admin.guard';

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

  @Get('me')
  @UseGuards(IsUser)
  async getProfile(@CurrentUser() user: User) {
    return user;
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

  @Put()
  @UseGuards(IsAdmin)
  @ApiBearerAuth()
  async replace() {
    console.log('replace');
  }

  @Patch(':email')
  @UseGuards(IsAdmin)
  async promote(@Param('email') email: string) {
    console.log(email);
  }
}
