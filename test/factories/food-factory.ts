import { CreateFoodProps, Food } from '@app/entities/food';
import { InMemoryFoodRepository } from '@test/repositories/in-memory-food-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';
import { generateArray } from './generic-factory';

export function makeFood(food: Partial<CreateFoodProps> = {}) {
  return new Food({
    id: food.id ?? 'test-id',
    createdAt: food.createdAt ?? 'test-created-at',
    updatedAt: food.updatedAt ?? 'test-updated-at',
    name: food.name ?? 'test-name',
    category: food.category ?? 'test-category',
    energy: food.energy ?? 100,
    carbohydrate: food.carbohydrate ?? 100,
    lipid: food.lipid ?? 100,
    fiber: food.fiber ?? 100,
    protein: food.protein ?? 100,
  });
}

const defaultMap = (i: number) => {
  return {
    name: `Test Food #${i}`,
  };
};

export function generateFoods(
  total = 100,
  map: (i: number) => Partial<CreateFoodProps> = defaultMap,
) {
  return generateArray((i) => {
    const id = String(i);

    const props = map(i);

    return makeFood({ id, ...props });
  }, total);
}

export function makeRepository(
  foods: Food[] = [],
  categories: Record<number, string> = {},
) {
  const utils = new RepositoryUtils<Food>();

  return new InMemoryFoodRepository(foods, utils, categories);
}
