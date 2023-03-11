import { Module } from '@nestjs/common';

import { ExerciceRepository } from '@app/repositories/exercice-repository';
import { FoodRepository } from '@app/repositories/food-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaExerciceRepository } from './prisma/repositories/prisma-exercice-repository';
import { PrismaFoodRepository } from './prisma/repositories/prisma-food-repository';

@Module({
  providers: [
    PrismaService,

    {
      provide: ExerciceRepository,
      useClass: PrismaExerciceRepository,
    },
    {
      provide: FoodRepository,
      useClass: PrismaFoodRepository,
    },
  ],
  exports: [ExerciceRepository, FoodRepository],
})
export class DatabaseModule {}
