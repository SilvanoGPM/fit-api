import { Module } from '@nestjs/common';

import { ExerciceRepository } from '@app/repositories/exercice-repository';

import { IoService } from './io.service';
import { StaticExerciceRepository } from './repositories/static-exercice-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';

@Module({
  providers: [
    IoService,
    RepositoryUtils,
    {
      provide: ExerciceRepository,
      useClass: StaticExerciceRepository,
    },
  ],
  exports: [ExerciceRepository],
})
export class StaticModule {}
