import { Exercice } from '@app/entities/exercice';
import type { Pageable, Page } from '@app/repositories/pages.type';
import { RepositoryUtils } from '@test/utils/repository-utils';

import type {
  ExerciceRepository,
  SearchExercice,
} from '@app/repositories/exercice-repository';

export class InMemoryExerciceRepository implements ExerciceRepository {
  constructor(
    public exercices: Exercice[] = [],
    private utils: RepositoryUtils<Exercice>,
  ) {}

  async findMany(params: Pageable) {
    return this.utils.getPage({ data: this.exercices, ...params });
  }

  async findByName(name: string) {
    return this.utils.findByString({
      data: this.exercices,
      property: 'name',
      search: name,
    });
  }

  async search({
    mode,
    muscle,
    difficulty,
    name,
    ...params
  }: SearchExercice): Promise<Page<Exercice>> {
    const getExercices = (exercices: Exercice[]) => {
      const allParamsUndefined = [mode, muscle, name].every(
        (param) => param === undefined,
      );

      if (allParamsUndefined) {
        return exercices;
      }

      return exercices.filter((exercice) => {
        const hasName = this.utils.like(exercice.name, name);
        const hasMuscle = this.utils.like(exercice.muscle, muscle);
        const hasDifficulty = this.utils.like(exercice.difficulty, difficulty);
        const hasMode = this.utils.like(exercice.mode, mode);

        const shouldPass = hasName && hasMuscle && hasDifficulty && hasMode;

        return shouldPass;
      });
    };

    return this.utils.getPage({
      data: getExercices(this.exercices),
      ...params,
    });
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
}
