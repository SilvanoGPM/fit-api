import { Food } from '@app/entities/food';
import { makeFood } from '@test/factories/food-factory';
import { generateArray } from '@test/factories/generic-factory';
import { InMemoryFoodRepository } from '@test/repositories/in-memory-food-repository';

import { GetAllFoodsUseCase } from './get-all-foods-use-case';

describe('GetAllFoods use case', () => {
  it('should be able to get all foods with pagination', async () => {
    const TOTAL_ELEMENTS = 100;

    const repositoryData = generateArray((i) => {
      const id = String(i);

      const props = makeFood({ name: `Test Food #${i}` });

      return new Food(props, id);
    }, TOTAL_ELEMENTS);

    const foodRepository = new InMemoryFoodRepository(repositoryData);

    const getAllFoods = new GetAllFoodsUseCase(foodRepository);

    const params = {
      page: 1,
      size: 10,
    };

    const { foods } = await getAllFoods.execute(params);

    expect(foods).toBeTruthy();
    expect(foods.hasNext).toBeTruthy();
    expect(foods.page).toEqual(params.page);
    expect(foods.size).toEqual(params.size);
    expect(foods.total).toEqual(TOTAL_ELEMENTS);

    expect(foods.data).toHaveLength(params.size);
    expect(foods.data[0]).toBeInstanceOf(Food);
  });
});
