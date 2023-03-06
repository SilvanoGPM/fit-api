import { Injectable } from '@nestjs/common';

import { FoodRepository } from '@app/repositories/food-repository';
import { Food } from '@app/entities/food';

interface CreateFoodProps {
  name: string;
  categoryId?: number;
  energy: number;
  fiber: number;
  protein: number;
  carbohydrate: number;
  lipid: number;
}

@Injectable()
export class CreateFoodUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute(props: CreateFoodProps) {
    const categories = await this.foodRepository.getCategories();

    const food = new Food({
      name: props.name,
      category: props.categoryId ? categories[props.categoryId] : 'Outros',
      baseQuantity: 100,
      baseUnit: 'g',

      energy: {
        kcal: props.energy,
        kj: props.energy / 0.2390057,
      },

      carbohydrate: {
        quantity: props.carbohydrate,
        unit: 'g',
      },

      protein: {
        quantity: props.protein,
        unit: 'g',
      },

      lipid: {
        quantity: props.lipid,
        unit: 'g',
      },

      fiber: {
        quantity: props.fiber,
        unit: 'g',
      },
    });

    await this.foodRepository.create(food);

    return { food };
  }
}
