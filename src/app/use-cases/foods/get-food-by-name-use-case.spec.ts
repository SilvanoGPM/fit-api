import { Food } from '@app/entities/food';
import { makeFood, makeRepository } from '@test/factories/food-factory';

import { NotFoundError } from '../errors/not-found.error';
import { GetFoodByNameUseCase } from './get-food-by-name-use-case';

describe('GetFoodByName use case', () => {
  it('should be able to get a food', async () => {
    const initialFood = makeFood();

    const foodRepository = makeRepository([initialFood]);

    const getFoodByName = new GetFoodByNameUseCase(foodRepository);

    const { food } = await getFoodByName.execute(initialFood.name);

    expect(food).toBeInstanceOf(Food);
  });

  it('should not be able to get a food when it does not exists', async () => {
    const foodRepository = makeRepository();

    const getFoodByName = new GetFoodByNameUseCase(foodRepository);

    expect(() => {
      return getFoodByName.execute('random-name');
    }).rejects.toThrow(NotFoundError);
  });
});
