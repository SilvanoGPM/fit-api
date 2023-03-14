import { makeExercice } from '@test/factories/exercice-factory';

describe('Exercice entity', () => {
  it('should be able to create an exercice', () => {
    const exercice = makeExercice();

    expect(exercice).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        _createdAt: expect.any(String),
        _updatedAt: expect.any(String),
        name: expect.any(String),
        mode: expect.any(String),
        difficulty: expect.any(String),
        muscle: expect.any(String),

        steps: expect.arrayContaining([expect.any(String)]),

        videos: expect.objectContaining({
          male: expect.arrayContaining([expect.any(String)]),
          female: expect.arrayContaining([expect.any(String)]),
        }),
      }),
    );
  });
});
