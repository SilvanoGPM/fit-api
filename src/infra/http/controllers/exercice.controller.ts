import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  HttpCode,
  Put,
} from '@nestjs/common';

import { CreateExerciceUseCase } from '@app/use-cases/exercices/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercices/get-all-exercices-use-case';
import { GetExerciceByNameUseCase } from '@app/use-cases/exercices/get-exercice-by-name-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercices/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercices/search-exercices-use-case';
import { SearchExercice } from '@app/repositories/exercice-repository';
import { Pageable } from '@app/repositories/pages.type';

import { GenericService } from '../services/generic.service';
import { CreateExerciceDTO } from '../dtos/exercices/create-exercice.dto';
import { ReplaceExerciceDTO } from '../dtos/exercices/replace-exercice.dto';
import { ExerciceNotFoundError } from '../errors/exercice-not-found.error';

@Controller('exercices')
export class ExerciceController {
  constructor(
    private createExercice: CreateExerciceUseCase,
    private getAllExercices: GetAllExercicesUseCase,
    private getExerciceByName: GetExerciceByNameUseCase,
    private replaceExercice: ReplaceExerciceUseCase,
    private searchExercices: SearchExercicesUseCase,
    private genericService: GenericService,
  ) {}

  @Get()
  async getAll(@Query() query: Pageable) {
    const params = this.genericService.getPageParamsByQuery(query);

    const { exercices } = await this.getAllExercices.execute(params);

    return exercices;
  }

  @Get('search')
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
