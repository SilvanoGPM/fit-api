import { Module } from '@nestjs/common';

import { ExerciceRepository } from '@app/repositories/exercice-repository';
import { FoodRepository } from '@app/repositories/food-repository';
import { UserRepository } from '@app/repositories/user-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaExerciceRepository } from './prisma/repositories/prisma-exercice-repository';
import { PrismaFoodRepository } from './prisma/repositories/prisma-food-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

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
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [ExerciceRepository, FoodRepository, UserRepository],
})
export class DatabaseModule {}
