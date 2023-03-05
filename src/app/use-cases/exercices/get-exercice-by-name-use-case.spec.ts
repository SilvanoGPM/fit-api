import { Exercice } from '@app/entities/exercice';
import { makeExercice, makeRepository } from '@test/factories/exercice-factory';

import { GetExerciceByNameUseCase } from './get-exercice-by-name-use-case';
import { NotFoundError } from '../errors/not-found.error';

describe('GetExerciceByName use case', () => {
  it('should be able to get an exercice', async () => {
    const initialExercice = makeExercice();

    const exerciceRepository = makeRepository([initialExercice]);

    const getExerciceByName = new GetExerciceByNameUseCase(exerciceRepository);

    const { exercice } = await getExerciceByName.execute(initialExercice.name);

    expect(exercice).toBeInstanceOf(Exercice);
  });

  it('should not be able to get an exercice when it does not exists', async () => {
    const exerciceRepository = makeRepository();

    const getExerciceByName = new GetExerciceByNameUseCase(exerciceRepository);

    expect(() => {
      return getExerciceByName.execute('random-name');
    }).rejects.toThrow(NotFoundError);
  });
});
