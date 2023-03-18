import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ExerciceRepository } from '@app/repositories/exercice-repository';
import { FoodRepository } from '@app/repositories/food-repository';
import { UserRepository } from '@app/repositories/user-repository';
import { RefreshTokenRepository } from '@app/repositories/refresh-token-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaExerciceRepository } from './prisma/repositories/prisma-exercice-repository';
import { PrismaFoodRepository } from './prisma/repositories/prisma-food-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaRefreshTokenRepository } from './prisma/repositories/prisma-refresh-token-repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],

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
    {
      provide: RefreshTokenRepository,
      useClass: PrismaRefreshTokenRepository,
    },
  ],
  exports: [
    ExerciceRepository,
    FoodRepository,
    UserRepository,
    RefreshTokenRepository,
  ],
})
export class DatabaseModule {}
