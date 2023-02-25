import { Injectable } from '@nestjs/common';

import { Exercice } from '@app/entities/exercice';
import type { Pageable, Page } from '@app/repositories/pages.type';

import type {
  ExerciceRepository,
  SearchExercice,
} from '@app/repositories/exercice-repository';

interface GetPageParams extends Pageable {
  exercices: Exercice[];
}

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

  async findById(id: string) {
    const exercice = this.exercices.find(
      (innerExercice) => innerExercice.id === id,
    );

    if (!exercice) {
      return null;
    }

    return exercice;
  }

  async search({
    mode,
    muscle,
    name,
    ...params
  }: SearchExercice): Promise<Page<Exercice>> {
    function like(first: string, second?: string) {
      if (!second) {
        return false;
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
        if (like(exercice.name, name)) {
          return true;
        }

        if (like(exercice.mode, mode)) {
          return true;
        }

        if (like(exercice.muscle, muscle)) {
          return true;
        }

        return false;
      });
    }

    return this.getPage({ exercices: getExercices(this.exercices), ...params });
  }

  async create(exercice: Exercice): Promise<void> {
    this.exercices.push(exercice);
  }

  async save(exercice: Exercice): Promise<void> {
    const index = this.exercices.findIndex(
      (innerExercice) => innerExercice.id === exercice.id,
    );

    if (index >= 0) {
      this.exercices[index] = exercice;
    }
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
    const path =
      'C:\\Users\\usuario\\Documents\\projects\\fit-api\\src\\infra\\static\\repositories\\data\\exercices.json';

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
