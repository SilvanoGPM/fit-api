import { Food, FoodProps } from '@app/entities/food';
import { InMemoryFoodRepository } from '@test/repositories/in-memory-food-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';
import { generateArray } from './generic-factory';

export function makeFood(food: Partial<FoodProps> = {}, id?: string) {
  return new Food(
    {
      name: food.name ?? 'test-name',
      baseQuantity: food.baseQuantity ?? 100,
      baseUnit: food.baseUnit ?? 'test-unit',
      category: food.category ?? 'test-category',

      energy: food.energy ?? {
        kcal: 100,
        kj: 100,
      },

      carbohydrate: food.carbohydrate ?? {
        quantity: 100,
        unit: 'test-unit',
      },

      lipid: food.lipid ?? {
        quantity: 100,
        unit: 'test-unit',
      },

      fiber: food.fiber ?? {
        quantity: 100,
        unit: 'test-unit',
      },

      protein: food.protein ?? {
        quantity: 100,
        unit: 'test-unit',
      },
    },
    id,
  );
}

const defaultMap = (i) => {
  return {
    name: `Test Exercice #${i}`,
  };
};

export function generateFoods(
  total = 100,
  map: (i: number) => Partial<FoodProps> = defaultMap,
) {
  return generateArray((i) => {
    const id = String(i);

    const props = map(i);

    return makeFood(props, id);
  }, total);
}

export function makeRepository(foods: Food[] = []) {
  const utils = new RepositoryUtils<Food>();

  return new InMemoryFoodRepository(foods, utils);
}
