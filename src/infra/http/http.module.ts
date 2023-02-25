import { Module } from '@nestjs/common';

import { StaticModule } from '@infra/static/static.module';
import { CreateExerciceUseCase } from '@app/use-cases/exercice/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercice/get-all-exercices-use-case';
import { GetExerciceByIdUseCase } from '@app/use-cases/exercice/get-exercice-by-id-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercice/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercice/search-exercices-use-case';

import { ExerciceController } from './controllers/exercice.controller';

@Module({
  imports: [StaticModule],
  controllers: [ExerciceController],
  providers: [
    CreateExerciceUseCase,
    GetAllExercicesUseCase,
    GetExerciceByIdUseCase,
    ReplaceExerciceUseCase,
    SearchExercicesUseCase,
  ],
})
export class HttpModule {}
