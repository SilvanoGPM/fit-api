import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { Exercice } from '@app/entities/exercice';
import type { Pageable, Page } from '@app/repositories/pages.type';

import type {
  ExerciceRepository,
  SearchExercice,
} from '@app/repositories/exercice-repository';

interface GetPageParams extends Pageable {
  exercices: Exercice[];
}

import './data/exercices.json';

import { IoService } from '../io.service';

@Injectable()
export class StaticExerciceRepository implements ExerciceRepository {
  private exercices: Exercice[] = [];

  constructor(private io: IoService) {
    this.loadData();
  }

  async findMany(params: Pageable) {
    return this.getPage({ exercices: this.exercices, ...params });
  }

  async findByName(name: string) {
    function formatName(string: string) {
      return string.toLowerCase().replace(/\-/g, ' ');
    }

    const exercice = this.exercices.find((exercice) => {
      const [formattedExerciceName, formattedName] = [exercice.name, name].map(
        formatName,
      );

      return formattedExerciceName === formattedName;
    });

    if (!exercice) {
      return null;
    }

    return exercice;
  }

  async search({
    mode,
    muscle,
    difficulty,
    name,
    ...params
  }: SearchExercice): Promise<Page<Exercice>> {
    function like(first: string, second?: string) {
      if (second === undefined || second === '') {
        return true;
      }

      return first.toLowerCase().includes(second.toLowerCase());
    }

    function getExercices(exercices: Exercice[]) {
      const allParamsUndefined = [mode, muscle, name].every(
        (param) => param === undefined,
      );

      if (allParamsUndefined) {
        return exercices;
      }

      return exercices.filter((exercice) => {
        const hasName = like(exercice.name, name);
        const hasMuscle = like(exercice.muscle, muscle);
        const hasDifficulty = like(exercice.difficulty, difficulty);
        const hasMode = like(exercice.mode, mode);

        const shouldPass = hasName && hasMuscle && hasDifficulty && hasMode;

        return shouldPass;
      });
    }

    return this.getPage({ exercices: getExercices(this.exercices), ...params });
  }

  async create(exercice: Exercice) {
    this.exercices.push(exercice);
  }

  async save(exercice: Exercice) {
    const index = this.exercices.findIndex(
      (innerExercice) => innerExercice.id === exercice.id,
    );

    const exists = index >= 0;

    if (exists) {
      this.exercices[index] = exercice;
    }

    return exists;
  }

  private getPage({ exercices, page, size }: GetPageParams) {
    const start = size * (page - 1);
    const end = start + size;

    const total = exercices.length;

    const data = exercices.slice(start, end);

    const hasNext = Boolean(exercices[end]);

    return {
      data,
      page,
      size,
      total,
      hasNext,
    };
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
