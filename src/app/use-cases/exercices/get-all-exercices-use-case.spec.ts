import { Exercice } from '@app/entities/exercice';

import {
  generateExercices,
  makeRepository,
} from '@test/factories/exercice-factory';

import { GetAllExercicesUseCase } from './get-all-exercices-use-case';

describe('GetAllExercices use case', () => {
  it('should be able to get all exercices with pagination', async () => {
    const TOTAL_ELEMENTS = 100;

    const repositoryData = generateExercices(TOTAL_ELEMENTS);

    const exerciceRepository = makeRepository(repositoryData);

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
