import { Food } from '@app/entities/food';
import { generateFoods, makeRepository } from '@test/factories/food-factory';
import { SearchFoodsUseCase } from './search-foods-use-case';

describe('SearchFoods use case', () => {
  it('should be able to search all foods with pagination when search not send', async () => {
    const TOTAL_ELEMENTS = 100;

    const repositoryData = generateFoods(TOTAL_ELEMENTS);

    const foodRepository = makeRepository(repositoryData);

    const searchFoods = new SearchFoodsUseCase(foodRepository);

    const params = {
      page: 1,
      size: 10,
    };

    const { foods } = await searchFoods.execute(params);

    expect(foods).toBeTruthy();
    expect(foods.hasNext).toBeTruthy();
    expect(foods.page).toEqual(params.page);
    expect(foods.size).toEqual(params.size);
    expect(foods.total).toEqual(TOTAL_ELEMENTS);

    expect(foods.data).toHaveLength(params.size);
    expect(foods.data[0]).toBeInstanceOf(Food);
  });

  it('should be able to search foods with pagination', async () => {
    const TOTAL_OF_FOODS_WITH_TEN_ON_NAME = 2;

    const repositoryData = generateFoods();

    const exerciceRepository = makeRepository(repositoryData);

    const searchFoods = new SearchFoodsUseCase(exerciceRepository);

    const params = {
      page: 1,
      size: 10,
      name: '10',
    };

    const { foods } = await searchFoods.execute(params);

    expect(foods).toBeTruthy();
    expect(foods.hasNext).toBeFalsy();
    expect(foods.page).toEqual(params.page);
    expect(foods.size).toEqual(params.size);
    expect(foods.total).toEqual(TOTAL_OF_FOODS_WITH_TEN_ON_NAME);

    expect(foods.data).toHaveLength(TOTAL_OF_FOODS_WITH_TEN_ON_NAME);
    expect(foods.data[0]).toBeInstanceOf(Food);
  });
});
