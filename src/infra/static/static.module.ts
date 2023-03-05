import { Module } from '@nestjs/common';

import { ExerciceRepository } from '@app/repositories/exercice-repository';

import { IoService } from './io.service';
import { StaticExerciceRepository } from './repositories/static-exercice-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';
import { FoodRepository } from '@app/repositories/food-repository';
import { StaticFoodRepository } from './repositories/static-food-repository';

@Module({
  providers: [
    IoService,
    RepositoryUtils,

    {
      provide: FoodRepository,
      useClass: StaticFoodRepository,
    },

    {
      provide: ExerciceRepository,
      useClass: StaticExerciceRepository,
    },
  ],
  exports: [FoodRepository, ExerciceRepository],
})
export class StaticModule {}
