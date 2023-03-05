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

    const { food } = await replaceFood.execute({
      ...params,
      id: initialFood.id,
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

    expect(() => {
      return replaceFood.execute({ id: 'random-id', ...params });
    }).rejects.toThrow(NotFoundError);
  });
});
