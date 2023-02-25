import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
  Post,
  Body,
  HttpCode,
  Put,
} from '@nestjs/common';

import { CreateExerciceUseCase } from '@app/use-cases/exercice/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercice/get-all-exercices-use-case';
import { GetExerciceByIdUseCase } from '@app/use-cases/exercice/get-exercice-by-id-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercice/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercice/search-exercices-use-case';
import { SearchExercice } from '@app/repositories/exercice-repository';
import { Pageable } from '@app/repositories/pages.type';

import { GenericService } from '../services/generic.service';
import { CreateExerciceDTO } from '../dtos/exercices/create-exercice.dto';
import { ReplaceExerciceDTO } from '../dtos/exercices/replace-exercice.dto';

@Controller('exercices')
export class ExerciceController {
  constructor(
    private createExercice: CreateExerciceUseCase,
    private getAllExercices: GetAllExercicesUseCase,
    private getExerciceById: GetExerciceByIdUseCase,
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
  async search(@Query() { name, muscle, mode, ...query }: SearchExercice) {
    const { page, size } = this.genericService.getPageParamsByQuery(query);

    const { exercices } = await this.searchExercices.execute({
      name,
      muscle,
      mode,
      page,
      size,
    });

    return exercices;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const { exercice } = await this.getExerciceById.execute(id);

    if (!exercice) {
      throw new NotFoundException('Exercice not found', {
        description: `Exercice with id [${id}] not found`,
      });
    }

    return { exercice };
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
  }
}
