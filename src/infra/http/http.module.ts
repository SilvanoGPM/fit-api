import { Module } from '@nestjs/common';

import { StaticModule } from '@infra/static/static.module';
import { CreateExerciceUseCase } from '@app/use-cases/exercices/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercices/get-all-exercices-use-case';
import { GetExerciceByNameUseCase } from '@app/use-cases/exercices/get-exercice-by-name-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercices/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercices/search-exercices-use-case';
import { CreateFoodUseCase } from '@app/use-cases/foods/create-food-use-case';
import { GetAllFoodsUseCase } from '@app/use-cases/foods/get-all-foods-use-case';
import { GetFoodByNameUseCase } from '@app/use-cases/foods/get-food-by-name-use-case';
import { ReplaceFoodUseCase } from '@app/use-cases/foods/replace-food-use-case';
import { SearchFoodsUseCase } from '@app/use-cases/foods/search-foods-use-case';
import { GetAllCategoriesUseCase } from '@app/use-cases/foods/get-all-categories-use-case';

import { ExerciceController } from './controllers/exercice.controller';
import { GenericService } from './services/generic.service';
import { FoodController } from './controllers/food.controller';

@Module({
  imports: [StaticModule],
  controllers: [ExerciceController, FoodController],
  providers: [
    GenericService,

    CreateExerciceUseCase,
    GetAllExercicesUseCase,
    GetExerciceByNameUseCase,
    ReplaceExerciceUseCase,
    SearchExercicesUseCase,

    GetAllFoodsUseCase,
    GetAllCategoriesUseCase,
    CreateFoodUseCase,
    GetFoodByNameUseCase,
    ReplaceFoodUseCase,
    SearchFoodsUseCase,
  ],
})
export class HttpModule {}
