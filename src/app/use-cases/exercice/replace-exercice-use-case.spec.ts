import { Exercice } from '@app/entities/exercice';
import { makeExercice } from '@test/factories/exercice-factory';
import { InMemoryExerciceRepository } from '@test/repositories/in-memory-exercice-repository';

import { ReplaceExerciceUseCase } from './replace-exercice-use-case';

describe('ReplaceExercice use case', () => {
  it('should be able to replace an exercice', async () => {
    const initialExercice = makeExercice();

    const exerciceRepository = new InMemoryExerciceRepository([
      initialExercice,
    ]);

    const replaceExercice = new ReplaceExerciceUseCase(exerciceRepository);

    const params = {
      name: 'test-name-modified',
      muscle: 'test-muscle',
      mode: 'test-mode',
      steps: ['test-first-step'],

      videos: {
        male: 'test-male-video',
        female: 'test-female-video',
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
});
