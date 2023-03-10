import { Module } from '@nestjs/common';

import { CreateExerciceUseCase } from '@app/use-cases/exercices/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercices/get-all-exercices-use-case';
import { GetExerciceByIdUseCase } from '@app/use-cases/exercices/get-exercice-by-id-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercices/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercices/search-exercices-use-case';
import { CreateFoodUseCase } from '@app/use-cases/foods/create-food-use-case';
import { GetAllFoodsUseCase } from '@app/use-cases/foods/get-all-foods-use-case';
import { GetFoodByNameUseCase } from '@app/use-cases/foods/get-food-by-name-use-case';
import { GetFoodByIdUseCase } from '@app/use-cases/foods/get-food-by-id-use-case';
import { ReplaceFoodUseCase } from '@app/use-cases/foods/replace-food-use-case';
import { SearchFoodsUseCase } from '@app/use-cases/foods/search-foods-use-case';
import { GetAllCategoriesUseCase } from '@app/use-cases/foods/get-all-categories-use-case';

import { ExerciceController } from './controllers/exercice.controller';
import { GenericService } from './services/generic.service';
import { FoodController } from './controllers/food.controller';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExerciceController],
  providers: [
    GenericService,

    CreateExerciceUseCase,
    GetAllExercicesUseCase,
    GetExerciceByIdUseCase,
    ReplaceExerciceUseCase,
    SearchExercicesUseCase,

    // GetAllFoodsUseCase,
    // GetAllCategoriesUseCase,
    // GetFoodByNameUseCase,
    // GetFoodByIdUseCase,
    // CreateFoodUseCase,
    // ReplaceFoodUseCase,
    // SearchFoodsUseCase,
  ],
})
export class HttpModule {}
