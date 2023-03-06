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
      ...props,
      category: props.categoryId ? categories[props.categoryId] : 'Outros',
    });

    await this.foodRepository.create(food);

    return { food };
  }
}
