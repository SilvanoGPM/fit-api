import { NotFoundError } from '../errors/not-found.error';
import { makeRepository, makeFood } from '@test/factories/food-factory';
import { Food } from '@app/entities/food';
import { ReplaceFoodUseCase } from './replace-food-use-case';

describe('ReplaceFood use case', () => {
  it('should be able to replace a food', async () => {
    const initialFood = makeFood();

    const foodRepository = makeRepository([initialFood]);

    const replaceFood = new ReplaceFoodUseCase(foodRepository);

    const params = {
      name: 'test-name-modified',
      energy: 100,
      carbohydrate: 100,
      lipid: 100,
      fiber: 100,
      protein: 100,
    };

    const { food } = await replaceFood.execute({
      id: initialFood.id,
      ...params,
    });

    expect(foodRepository.foods).toHaveLength(1);
    expect(foodRepository.foods[0]).toEqual(food);
    expect(food).toBeInstanceOf(Food);
  });

  it('should not be able to replace a food when it does not exists', async () => {
    const exerciceRepository = makeRepository();

    const replaceFood = new ReplaceFoodUseCase(exerciceRepository);

    const params = {
      name: 'test-name-modified',
      energy: 100,
      carbohydrate: 100,
      lipid: 100,
      fiber: 100,
      protein: 100,
    };

    expect(() => {
      return replaceFood.execute({ id: 'random-id', ...params });
    }).rejects.toThrow(NotFoundError);
  });
});
