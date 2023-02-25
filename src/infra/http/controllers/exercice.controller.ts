import { Controller, Get, Query } from '@nestjs/common';

import { CreateExerciceUseCase } from '@app/use-cases/exercice/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercice/get-all-exercices-use-case';
import { GetExerciceByIdUseCase } from '@app/use-cases/exercice/get-exercice-by-id-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercice/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercice/search-exercices-use-case';

@Controller('exercices')
export class ExerciceController {
  constructor(
    private createExercice: CreateExerciceUseCase,
    private getAllExercices: GetAllExercicesUseCase,
    private getExerciceById: GetExerciceByIdUseCase,
    private replaceExercice: ReplaceExerciceUseCase,
    private searchExercices: SearchExercicesUseCase,
  ) {}

  @Get()
  async getAll(@Query('page') page = 1, @Query('size') size = 10) {
    const { exercices } = await this.getAllExercices.execute({
      size: Number(size),
      page: Number(page),
    });

    return exercices;
  }
}
