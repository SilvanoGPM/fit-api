import { Food } from '@app/entities/food';
import { makeRepository } from '@test/factories/food-factory';

import { CreateFoodUseCase } from './create-food-use-case';

describe('CreateFood use case', () => {
  it('should be able to create a food', async () => {
    const foodRepository = makeRepository();

    const createFood = new CreateFoodUseCase(foodRepository);

    const params = {
      name: 'test-name',
      baseQuantity: 100,
      baseUnit: 'test-unit',
      category: 'test-category',

      energy: {
        kcal: 100,
        kj: 100,
      },

      carbohydrate: {
        quantity: 100,
        unit: 'test-unit',
      },

      lipid: {
        quantity: 100,
        unit: 'test-unit',
      },

      fiber: {
        quantity: 100,
        unit: 'test-unit',
      },

      protein: {
        quantity: 100,
        unit: 'test-unit',
      },
    };

    const { food } = await createFood.execute(params);

    expect(foodRepository.foods).toHaveLength(1);
    expect(foodRepository.foods[0]).toEqual(food);
    expect(food).toBeInstanceOf(Food);
  });
});
