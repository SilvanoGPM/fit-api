import {
  CreateExerciceProps,
  Exercice,
  ExerciceProps,
} from '@app/entities/exercice';

import { InMemoryExerciceRepository } from '@test/repositories/in-memory-exercice-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';

import { generateArray } from './generic-factory';

export function makeExercice(exercice: Partial<CreateExerciceProps> = {}) {
  return new Exercice({
    id: exercice.id ?? 'test-id',
    createdAt: exercice.createdAt ?? 'test-created-at',
    updatedAt: exercice.updatedAt ?? 'test-updated-at',
    name: exercice.name ?? 'test-name',
    difficulty: exercice.difficulty ?? 'test-difficulty',
    mode: exercice.mode ?? 'test-mode',
    muscle: exercice.muscle ?? 'test-muscle',
    steps: exercice.steps ?? ['test-first-step'],
    videos: exercice.videos ?? {
      male: ['test-male-video'],
      female: ['test-female-video'],
    },
  });
}

const defaultMap = (i: number) => {
  return {
    name: `Test Exercice #${i}`,
  };
};

export function generateExercices(
  total = 100,
  map: (i: number) => Partial<ExerciceProps> = defaultMap,
) {
  return generateArray((i) => {
    const id = String(i);

    const props = map(i);

    return makeExercice({ id, ...props });
  }, total);
}

export function makeRepository(exercices: Exercice[] = []) {
  const utils = new RepositoryUtils<Exercice>();

  return new InMemoryExerciceRepository(exercices, utils);
}
