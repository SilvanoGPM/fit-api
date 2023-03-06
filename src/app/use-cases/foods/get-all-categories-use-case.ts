import { Injectable } from '@nestjs/common';

import { FoodRepository } from '@app/repositories/food-repository';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute() {
    const allCategories = await this.foodRepository.getCategories();

    const categories = Object.entries(allCategories).map(([key, value]) => ({
      id: Number(key),
      name: value,
    }));

    return { categories };
  }
}
