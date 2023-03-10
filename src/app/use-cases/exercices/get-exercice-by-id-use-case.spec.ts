import { Exercice } from '@app/entities/exercice';
import { makeExercice, makeRepository } from '@test/factories/exercice-factory';

import { GetExerciceByIdUseCase } from './get-exercice-by-id-use-case';
import { NotFoundError } from '../errors/not-found.error';

describe('GetExerciceById use case', () => {
  it('should be able to get an exercice', async () => {
    const initialExercice = makeExercice();

    const exerciceRepository = makeRepository([initialExercice]);

    const getExerciceById = new GetExerciceByIdUseCase(exerciceRepository);

    const { exercice } = await getExerciceById.execute(initialExercice.id);

    expect(exercice).toBeInstanceOf(Exercice);
  });

  it('should not be able to get an exercice when it does not exists', async () => {
    const exerciceRepository = makeRepository();

    const getExerciceById = new GetExerciceByIdUseCase(exerciceRepository);

    expect(() => {
      return getExerciceById.execute('random-id');
    }).rejects.toThrow(NotFoundError);
  });
});
