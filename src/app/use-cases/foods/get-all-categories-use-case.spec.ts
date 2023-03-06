import { makeRepository } from '@test/factories/food-factory';

import { GetAllCategoriesUseCase } from './get-all-categories-use-case';

describe('GetAllCategories use case', () => {
  it('should be able to get all food categories', async () => {
    const foodRepository = makeRepository([], {
      1: 'test-category',
    });

    const getAllCategories = new GetAllCategoriesUseCase(foodRepository);

    const { categories } = await getAllCategories.execute();

    expect(categories).toBeTruthy();
    expect(categories).toHaveLength(1);

    expect(categories[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });
});
