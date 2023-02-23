import { Exercice } from '@app/entities/exercice';
import { InMemoryExerciceRepository } from '@test/repositories/in-memory-exercice-repository';

import { CreateExerciceUseCase } from './create-exercice-use-case';

describe('CreateExercice use case', () => {
  it('should be able to create an exercice', async () => {
    const exerciceRepository = new InMemoryExerciceRepository();

    const createExercice = new CreateExerciceUseCase(exerciceRepository);

    const params = {
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

    const { exercice } = await createExercice.execute(params);

    expect(exerciceRepository.exercices).toHaveLength(1);
    expect(exerciceRepository.exercices[0]).toEqual(exercice);
    expect(exercice).toBeInstanceOf(Exercice);
  });
});
