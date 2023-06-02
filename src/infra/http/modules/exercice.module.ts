import { Module } from '@nestjs/common';

import { CreateExerciceUseCase } from '@app/use-cases/exercices/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercices/get-all-exercices-use-case';
import { GetExerciceByIdUseCase } from '@app/use-cases/exercices/get-exercice-by-id-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercices/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercices/search-exercices-use-case';
import { DatabaseModule } from '@infra/database/database.module';

export const cases = [
  CreateExerciceUseCase,
  GetAllExercicesUseCase,
  GetExerciceByIdUseCase,
  ReplaceExerciceUseCase,
  SearchExercicesUseCase,
];

@Module({
  imports: [DatabaseModule],
  providers: cases,
  exports: cases,
})
export class ExerciceModule {}
