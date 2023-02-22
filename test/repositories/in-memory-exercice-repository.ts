import { Exercice } from '@app/entities/exercice';
import type { Pageable, Page } from '@app/repositories/pages.type';

import type {
  ExerciceRepository,
  SearchExercice,
} from '@app/repositories/exercice-repository';

interface GetPageParams extends Pageable {
  exercices: Exercice[];
}

export class InMemoryExerciceRepository implements ExerciceRepository {
  constructor(public exercices: Exercice[] = []) {}

  async findMany(params: Pageable) {
    return this.getPage({ exercices: this.exercices, ...params });
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

    const exercices = this.exercices.filter((exercice) => {
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

    return this.getPage({ exercices, ...params });
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
}
