import { Exercice, ExerciceProps } from '@app/entities/exercice';
import { InMemoryExerciceRepository } from '@test/repositories/in-memory-exercice-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';
import { generateArray } from './generic-factory';

export function makeExercice(
  exercice: Partial<ExerciceProps> = {},
  id?: string,
) {
  return new Exercice(
    {
      name: exercice.name ?? 'test-name',
      difficulty: exercice.difficulty ?? 'test-difficulty',
      mode: exercice.mode ?? 'test-mode',
      muscle: exercice.muscle ?? 'test-muscle',
      steps: exercice.steps ?? ['test-first-step'],
      videos: exercice.videos ?? {
        male: ['test-male-video'],
        female: ['test-female-video'],
      },
    },
    id,
  );
}

export function generateExercices(
  map: (i: number) => Partial<ExerciceProps>,
  total = 100,
) {
  return generateArray((i) => {
    const id = String(i);

    const props = map(i);

    return makeExercice(props, id);
  }, total);
}

export function makeRepository(exercices: Exercice[] = []) {
  const utils = new RepositoryUtils<Exercice>();

  return new InMemoryExerciceRepository(exercices, utils);
}
