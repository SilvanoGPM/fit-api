import { Exercice } from '@app/entities/exercice';
import { makeExercice } from '@test/factories/exercice-factory';
import { generateArray } from '@test/factories/generic-factory';
import { InMemoryExerciceRepository } from '@test/repositories/in-memory-exercice-repository';

import { GetAllExercicesUseCase } from './get-all-exercices-use-case';

describe('GetAllExercices use case', () => {
  it('should be able to get all exercices with pagination', async () => {
    const TOTAL_ELEMENTS = 100;

    const repositoryData = generateArray((i) => {
      const id = String(i);

      const props = makeExercice({ name: `Test Exercice #${i}` });

      return new Exercice(props, id);
    }, TOTAL_ELEMENTS);

    const exerciceRepository = new InMemoryExerciceRepository(repositoryData);

    const getAllExercices = new GetAllExercicesUseCase(exerciceRepository);

    const params = {
      page: 1,
      size: 10,
    };

    const { exercices } = await getAllExercices.execute(params);

    expect(exercices).toBeTruthy();
    expect(exercices.hasNext).toBeTruthy();
    expect(exercices.page).toEqual(params.page);
    expect(exercices.size).toEqual(params.size);
    expect(exercices.total).toEqual(TOTAL_ELEMENTS);

    expect(exercices.data).toHaveLength(params.size);
    expect(exercices.data[0]).toBeInstanceOf(Exercice);
  });
});
