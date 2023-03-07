import { Food } from '@app/entities/food';
import { makeFood, makeRepository } from '@test/factories/food-factory';

import { NotFoundError } from '../errors/not-found.error';
import { GetFoodByIdUseCase } from './get-food-by-id-use-case';

describe('GetFoodById use case', () => {
  it('should be able to get a food', async () => {
    const initialFood = makeFood();

    const foodRepository = makeRepository([initialFood]);

    const getFoodById = new GetFoodByIdUseCase(foodRepository);

    const { food } = await getFoodById.execute(initialFood.id);

    expect(food).toBeInstanceOf(Food);
  });

  it('should not be able to get a food when it does not exists', async () => {
    const foodRepository = makeRepository();

    const getFoodById = new GetFoodByIdUseCase(foodRepository);

    expect(() => {
      return getFoodById.execute('random-id');
    }).rejects.toThrow(NotFoundError);
  });
});
