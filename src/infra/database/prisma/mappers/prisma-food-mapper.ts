import { Food as PrismaFood } from '@prisma/client';

import { Food } from '@app/entities/food';

export class PrismaFoodMapper {
  static toDomain(rawFood: PrismaFood) {
    return new Food(
      {
        name: rawFood.name,
        category: rawFood.category,
        energy: rawFood.energy,
        carbohydrate: rawFood.carbohydrate,
        fiber: rawFood.fiber,
        lipid: rawFood.lipid,
        protein: rawFood.protein,
      },
      rawFood.id,
    );
  }

  static toPrisma(food: Food) {
    return {
      id: food.id,
      name: food.name,
      category: food.category,
      energy: food.energy.kcal,
      carbohydrate: food.carbohydrate.quantity,
      fiber: food.fiber.quantity,
      lipid: food.lipid.quantity,
      protein: food.protein.quantity,
    };
  }
}
