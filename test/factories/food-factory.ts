import { CreateFoodProps, Food } from '@app/entities/food';
import { InMemoryFoodRepository } from '@test/repositories/in-memory-food-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';
import { generateArray } from './generic-factory';

export function makeFood(food: Partial<CreateFoodProps> = {}, id?: string) {
  return new Food(
    {
      name: food.name ?? 'test-name',
      category: food.category ?? 'test-category',
      energy: food.energy ?? 100,
      carbohydrate: food.carbohydrate ?? 100,
      lipid: food.lipid ?? 100,
      fiber: food.fiber ?? 100,
      protein: food.protein ?? 100,
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
  map: (i: number) => Partial<CreateFoodProps> = defaultMap,
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
