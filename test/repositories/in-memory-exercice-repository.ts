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
}
