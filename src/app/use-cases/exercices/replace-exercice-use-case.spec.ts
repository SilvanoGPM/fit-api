import { Exercice } from '@app/entities/exercice';
import { makeExercice, makeRepository } from '@test/factories/exercice-factory';

import { ReplaceExerciceUseCase } from './replace-exercice-use-case';
import { NotFoundError } from '../errors/not-found.error';

describe('ReplaceExercice use case', () => {
  it('should be able to replace an exercice', async () => {
    const initialExercice = makeExercice();

    const exerciceRepository = makeRepository([initialExercice]);

    const replaceExercice = new ReplaceExerciceUseCase(exerciceRepository);

    const params = {
      name: 'test-name-modified',
      difficulty: 'test-difficulty',
      muscle: 'test-muscle',
      mode: 'test-mode',
      steps: ['test-first-step'],

      videos: {
        male: ['test-male-video'],
        female: ['test-female-video'],
      },
    };

    const { exercice } = await replaceExercice.execute({
      ...params,
      id: initialExercice.id,
    });

    expect(exerciceRepository.exercices).toHaveLength(1);
    expect(exerciceRepository.exercices[0]).toEqual(exercice);
    expect(exercice).toBeInstanceOf(Exercice);
  });

  it('should not be able to replace an exercice when it does not exists', async () => {
    const exerciceRepository = makeRepository();

    const replaceExercice = new ReplaceExerciceUseCase(exerciceRepository);

    const params = {
      id: 'random-id',
      name: 'test-name',
      difficulty: 'test-difficulty',
      muscle: 'test-muscle',
      mode: 'test-mode',
      steps: ['test-first-step'],

      videos: {
        male: ['test-male-video'],
        female: ['test-female-video'],
      },
    };

    expect(() => {
      return replaceExercice.execute(params);
    }).rejects.toThrow(NotFoundError);
  });
});
