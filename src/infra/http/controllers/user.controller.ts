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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Pageable } from '@app/repositories/pages.type';
import { GetAllUsersUseCase } from '@app/use-cases/users/get-all-users-use-case';
import { User } from '@app/entities/user';
import { CreateUserUseCase } from '@app/use-cases/users/create-user-use-case';
import { UserExistsByEmailUseCase } from '@app/use-cases/users/user-exists-by-email-use-case';
import { GetUserByEmailUseCase } from '@app/use-cases/users/get-user-by-email-use-case';
import { ReplaceUserUseCase } from '@app/use-cases/users/replace-user-use-case';
import { PromoteUserUseCase } from '@app/use-cases/users/promote-user-use-case';

import { GenericService } from '../services/generic.service';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { CreateUserDTO } from '../dtos/users/create-user.dto';
import { CurrentUser } from '../auth/guards/current-user.guard';
import { IsUser } from '../auth/guards/is-user.guard';
import { IsAdmin } from '../auth/guards/is-admin.guard';
import { ReplaceUserDTO } from '../dtos/users/replace-user.dto';
import { PromoteUserDTO } from '../dtos/users/promote-user.dto';
import { UserAlreadyExists } from '../errors/user-already-exists.error';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(
    private getAllUsers: GetAllUsersUseCase,
    private getUserByEmail: GetUserByEmailUseCase,
    private userExistsByEmail: UserExistsByEmailUseCase,
    private createUser: CreateUserUseCase,
    private replaceUser: ReplaceUserUseCase,
    private promoteUser: PromoteUserUseCase,
    private genericService: GenericService,
  ) {}

  @Get()
  @UseGuards(IsAdmin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna todos os usuários com paginação.' })
  @ApiOkResponse({ description: 'Usuários encontrados com sucesso' })
  async getAll(@Query() query: Pageable) {
    const params = this.genericService.getPageParamsByQuery(query);

    const { users } = await this.getAllUsers.execute(params);

    return users;
  }

  @Get('me')
  @UseGuards(IsUser)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna os dados do usuário atual.' })
  @ApiOkResponse({ description: 'Dados encontrados com sucesso' })
  async getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Get(':email')
  @UseGuards(IsAdmin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna um usuário pelo e-mail.' })
  @ApiOkResponse({ description: 'Usuário encontrado com sucesso' })
  @ApiNotFoundResponse({ description: 'Nenhum usuário encontrado' })
  async getByEmail(@Param('email') email: string) {
    try {
      const { user } = await this.getUserByEmail.execute(email);

      return { user };
    } catch (error) {
      throw new UserNotFoundError(error);
    }
  }

  @Get(':email/exists')
  @ApiOperation({ summary: 'Verifica se um e-mail já está em uso.' })
  @ApiOkResponse({ description: 'Verificação ocorreu com sucesso' })
  async existsByEmail(@Param('email') email: string) {
    const exists = await this.userExistsByEmail.execute(email);

    return { exists };
  }

  @Post()
  @ApiOperation({ summary: 'Persiste um novo usuário.' })
  @ApiCreatedResponse({ description: 'Usuário foi criado com sucesso' })
  @ApiUnprocessableEntityResponse({
    description: 'Campo inválido na criação do usuário',
  })
  async create(@Body() createUserDto: CreateUserDTO) {
    const { email, password, name } = createUserDto;

    const userAlreadyExists = await this.userExistsByEmail.execute(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExists(email);
    }

    const user = await this.createUser.execute({
      email,
      password,
      name,
      role: 'user',
    });

    return { user };
  }

  @Put()
  @UseGuards(IsUser)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza um usuário.' })
  @ApiOkResponse({ description: 'Usuário atualizado com sucesso' })
  @ApiNotFoundResponse({ description: 'Nenhum usuário encontrado' })
  @ApiUnprocessableEntityResponse({
    description: 'Campo inválido na atualiza do usuário',
  })
  async replace(
    @CurrentUser() currentUser: User,
    @Body() replaceUserDto: ReplaceUserDTO,
  ) {
    try {
      const { id, email, role } = currentUser;

      const { user } = await this.replaceUser.execute({
        id,
        role,
        email,
        name: replaceUserDto.name,
        password: replaceUserDto.password,
      });

      return { user };
    } catch (error) {
      throw new UserNotFoundError(error);
    }
  }

  @Patch('promote')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(IsAdmin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Promove um usuário.' })
  @ApiOkResponse({ description: 'Usuário promovido com sucesso' })
  @ApiNotFoundResponse({ description: 'Nenhum usuário encontrado' })
  async promote(@Body() promoteDto: PromoteUserDTO) {
    try {
      await this.promoteUser.execute(promoteDto.email, promoteDto.role);
    } catch (error) {
      throw new UserNotFoundError(error);
    }
  }
}
