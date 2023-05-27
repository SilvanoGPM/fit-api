import { makeFood } from '@test/factories/food-factory';

describe('Food entity', () => {
  it('should be able to create a food', () => {
    const food = makeFood();

    expect(food).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        _createdAt: expect.any(String),
        _updatedAt: expect.any(String),
        name: expect.any(String),
        baseQuantity: expect.any(Number),
        baseUnit: expect.any(String),
        category: expect.any(String),
        images: expect.any(Array),

        energy: expect.objectContaining({
          kcal: expect.any(Number),
          kj: expect.any(Number),
        }),

        carbohydrate: {
          quantity: expect.any(Number),
          unit: expect.any(String),
        },

        lipid: {
          quantity: expect.any(Number),
          unit: expect.any(String),
        },

        fiber: {
          quantity: expect.any(Number),
          unit: expect.any(String),
        },

        protein: {
          quantity: expect.any(Number),
          unit: expect.any(String),
        },
      }),
    );
  });

  it('should be able to add a image', () => {
    const food = makeFood();

    food.addImage('test-image');

    expect(food.images).toHaveLength(1);
  });
});
