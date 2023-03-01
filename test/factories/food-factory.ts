import { Food } from '@app/entities/food';

export function makeFood(food: Partial<Food> = {}, id?: string) {
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
