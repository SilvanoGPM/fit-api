import { makeExercice } from '@test/factories/exercice-factory';

describe('Exercice entity', () => {
  it('should be able to create an exercice', () => {
    const exercice = makeExercice();

    expect(exercice).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        mode: expect.any(String),
        muscle: expect.any(String),

        steps: expect.arrayContaining([expect.any(String)]),

        videos: expect.objectContaining({
          male: expect.any(String),
          female: expect.any(String),
        }),
      }),
    );
  });
});
