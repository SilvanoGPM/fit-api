import { Injectable } from '@nestjs/common';

import { FoodRepository } from '@app/repositories/food-repository';
import { Food, FoodProps } from '@app/entities/food';

@Injectable()
export class CreateFoodUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute(props: FoodProps) {
    const food = new Food(props);

    await this.foodRepository.create(food);

    return { food };
  }
}
