import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AddFoodImageFoodUseCase } from '@app/use-cases/foods/add-food-image-use-case';
import { CreateFoodUseCase } from '@app/use-cases/foods/create-food-use-case';
import { GetAllFoodsUseCase } from '@app/use-cases/foods/get-all-foods-use-case';
import { GetFoodByNameUseCase } from '@app/use-cases/foods/get-food-by-name-use-case';
import { GetFoodByIdUseCase } from '@app/use-cases/foods/get-food-by-id-use-case';
import { ReplaceFoodUseCase } from '@app/use-cases/foods/replace-food-use-case';
import { SearchFoodsUseCase } from '@app/use-cases/foods/search-foods-use-case';
import { GetAllCategoriesUseCase } from '@app/use-cases/foods/get-all-categories-use-case';

export const cases = [
  GetAllFoodsUseCase,
  GetAllCategoriesUseCase,
  GetFoodByNameUseCase,
  GetFoodByIdUseCase,
  CreateFoodUseCase,
  ReplaceFoodUseCase,
  AddFoodImageFoodUseCase,
  SearchFoodsUseCase,
];

@Module({
  imports: [DatabaseModule],
  providers: cases,
  exports: cases,
})
export class FoodModule {}
