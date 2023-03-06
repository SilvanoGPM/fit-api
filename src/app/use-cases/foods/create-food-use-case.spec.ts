import { Food } from '@app/entities/food';
import { makeRepository } from '@test/factories/food-factory';

import { CreateFoodUseCase } from './create-food-use-case';

describe('CreateFood use case', () => {
  it('should be able to create a food', async () => {
    const foodRepository = makeRepository();

    const createFood = new CreateFoodUseCase(foodRepository);

    const params = {
      name: 'test-name',
      energy: 100,
      carbohydrate: 100,
      lipid: 100,
      fiber: 100,
      protein: 100,
    };

    const { food } = await createFood.execute(params);

    expect(foodRepository.foods).toHaveLength(1);
    expect(foodRepository.foods[0]).toEqual(food);
    expect(food).toBeInstanceOf(Food);
  });
});
