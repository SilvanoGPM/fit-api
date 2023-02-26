import { Module } from '@nestjs/common';

import { StaticModule } from '@infra/static/static.module';
import { CreateExerciceUseCase } from '@app/use-cases/exercices/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercices/get-all-exercices-use-case';
import { GetExerciceByNameUseCase } from '@app/use-cases/exercices/get-exercice-by-name-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercices/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercices/search-exercices-use-case';

import { ExerciceController } from './controllers/exercice.controller';
import { GenericService } from './services/generic.service';

@Module({
  imports: [StaticModule],
  controllers: [ExerciceController],
  providers: [
    CreateExerciceUseCase,
    GetAllExercicesUseCase,
    GetExerciceByNameUseCase,
    ReplaceExerciceUseCase,
    SearchExercicesUseCase,
    GenericService,
  ],
})
export class HttpModule {}
