import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateExerciceUseCase } from '@app/use-cases/exercices/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercices/get-all-exercices-use-case';
import { GetExerciceByIdUseCase } from '@app/use-cases/exercices/get-exercice-by-id-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercices/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercices/search-exercices-use-case';
import { SearchExercice } from '@app/repositories/exercice-repository';
import { Pageable } from '@app/repositories/pages.type';

import { GenericService } from '../services/generic.service';
import { CreateExerciceDTO } from '../dtos/exercices/create-exercice.dto';
import { ReplaceExerciceDTO } from '../dtos/exercices/replace-exercice.dto';
import { ExerciceNotFoundError } from '../errors/exercice-not-found.error';
import { IsAdmin } from '../auth/guards/is-admin.guard';

@ApiTags('Exercícios')
@Controller('exercices')
export class ExerciceController {
  constructor(
    private createExercice: CreateExerciceUseCase,
    private getAllExercices: GetAllExercicesUseCase,
    private getExerciceByName: GetExerciceByIdUseCase,
    private replaceExercice: ReplaceExerciceUseCase,
    private searchExercices: SearchExercicesUseCase,
    private genericService: GenericService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os exercícios com paginação.' })
  @ApiOkResponse({ description: 'Exercícios encontrados com sucesso' })
  async getAll(@Query() query: Pageable) {
    const params = this.genericService.getPageParamsByQuery(query);

    const { exercices } = await this.getAllExercices.execute(params);

    return exercices;
  }

  @Get('search')
  @ApiOperation({ summary: 'Pesquisa exercícios com paginação.' })
  @ApiOkResponse({ description: 'Exercícios encontrados com sucesso' })
  async search(
    @Query() { name, muscle, mode, difficulty, ...query }: SearchExercice,
  ) {
    const { page, size } = this.genericService.getPageParamsByQuery(query);

    const { exercices } = await this.searchExercices.execute({
      name,
      muscle,
      difficulty,
      mode,
      page,
      size,
    });

    return exercices;
  }

  @Get(':name')
  @ApiOperation({ summary: 'Retorna um exercício pelo nome.' })
  @ApiOkResponse({ description: 'Exercício encontrado com sucesso' })
  @ApiNotFoundResponse({ description: 'Nenhum exercício encontrado' })
  async findByName(@Param('name') name: string) {
    try {
      const { exercice } = await this.getExerciceByName.execute(name);

      return { exercice };
    } catch (error) {
      throw new ExerciceNotFoundError(error);
    }
  }

  @Post()
  @HttpCode(201)
  @UseGuards(IsAdmin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Persiste um novo exercício.' })
  @ApiCreatedResponse({ description: 'Exercício foi criado com sucesso' })
  @ApiUnprocessableEntityResponse({
    description: 'Campo inválido na criação do exercício',
  })
  async create(@Body() createExerciceDto: CreateExerciceDTO) {
    const { name, mode, muscle, difficulty, steps, videos } = createExerciceDto;

    const { exercice } = await this.createExercice.execute({
      name,
      mode,
      muscle,
      difficulty,
      steps,
      videos,
    });

    return { exercice };
  }

  @Put()
  @UseGuards(IsAdmin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza um exercício.' })
  @ApiOkResponse({ description: 'Exercício atualizado com sucesso' })
  @ApiNotFoundResponse({ description: 'Nenhum exercício encontrado' })
  @ApiUnprocessableEntityResponse({
    description: 'Campo inválido na atualização do exercício',
  })
  async replace(@Body() replaceExerciceDto: ReplaceExerciceDTO) {
    const { id, name, mode, muscle, difficulty, steps, videos } =
      replaceExerciceDto;

    try {
      const { exercice } = await this.replaceExercice.execute({
        id,
        name,
        mode,
        muscle,
        difficulty,
        steps,
        videos,
      });

      return { exercice };
    } catch (error) {
      throw new ExerciceNotFoundError(error);
    }
  }
}
