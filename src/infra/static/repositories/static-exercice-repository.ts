import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { Exercice } from '@app/entities/exercice';

import { IoService } from '../io.service';
import { InMemoryExerciceRepository } from '@test/repositories/in-memory-exercice-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';

import './data/exercices.json';

@Injectable()
export class StaticExerciceRepository extends InMemoryExerciceRepository {
  constructor(private io: IoService, utils: RepositoryUtils<Exercice>) {
    super([], utils);

    this.loadData();
  }

  private async loadData() {
    const path = join(__dirname, 'data', 'exercices.json');

    const rawData = await this.io.read<any>({ path });

    for (const muscle of Object.keys(rawData)) {
      for (const rawExercice of rawData[muscle]) {
        const { name, difficulty, mode, videos, steps } = rawExercice;

        const exercice = new Exercice({
          name,
          difficulty,
          mode,
          videos,
          steps,
          muscle,
        });

        this.exercices.push(exercice);
      }
    }
  }
}
