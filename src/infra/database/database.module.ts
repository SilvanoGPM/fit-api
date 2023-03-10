import { Module } from '@nestjs/common';

import { ExerciceRepository } from '@app/repositories/exercice-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaExerciceRepository } from './prisma/repositories/prisma-exercice-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ExerciceRepository,
      useClass: PrismaExerciceRepository,
    },
  ],
  exports: [ExerciceRepository],
})
export class DatabaseModule {}
