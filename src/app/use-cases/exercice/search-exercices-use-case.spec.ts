import { Exercice } from '@app/entities/exercice';
import { makeExercice } from '@test/factories/exercice-factory';
import { generateArray } from '@test/factories/generic-factory';
import { InMemoryExerciceRepository } from '@test/repositories/in-memory-exercice-repository';

import { SearchExercicesUseCase } from './search-exercices-use-case';

describe('SearchExercices use case', () => {
  it('should be able to search all exercices with pagination when params not send', async () => {
    const TOTAL_ELEMENTS = 100;

    const repositoryData = generateArray((i) => {
      const id = String(i);

      const props = makeExercice({ name: `Test Exercice #${i}` });

      return new Exercice(props, id);
    }, TOTAL_ELEMENTS);

    const exerciceRepository = new InMemoryExerciceRepository(repositoryData);

    const searchExercices = new SearchExercicesUseCase(exerciceRepository);

    const params = {
      page: 1,
      size: 10,
    };

    const { exercices } = await searchExercices.execute(params);

    expect(exercices).toBeTruthy();
    expect(exercices.hasNext).toBeTruthy();
    expect(exercices.page).toEqual(params.page);
    expect(exercices.size).toEqual(params.size);
    expect(exercices.total).toEqual(TOTAL_ELEMENTS);

    expect(exercices.data).toHaveLength(params.size);
    expect(exercices.data[0]).toBeInstanceOf(Exercice);
  });

  it('should be able to search exercices with pagination', async () => {
    const TOTAL_OF_EXERCICES_WITH_TEN_ON_NAME = 2;

    const repositoryData = generateArray((i) => {
      const id = String(i);

      const props = makeExercice({ name: `Test Exercice #${i}` });

      return new Exercice(props, id);
    });

    const exerciceRepository = new InMemoryExerciceRepository(repositoryData);

    const searchExercices = new SearchExercicesUseCase(exerciceRepository);

    const params = {
      page: 1,
      size: 10,
      name: '10',
    };

    const { exercices } = await searchExercices.execute(params);

    expect(exercices).toBeTruthy();
    expect(exercices.hasNext).toBeFalsy();
    expect(exercices.page).toEqual(params.page);
    expect(exercices.size).toEqual(params.size);
    expect(exercices.total).toEqual(TOTAL_OF_EXERCICES_WITH_TEN_ON_NAME);

    expect(exercices.data).toHaveLength(TOTAL_OF_EXERCICES_WITH_TEN_ON_NAME);
    expect(exercices.data[0]).toBeInstanceOf(Exercice);
  });
});
