import { Injectable } from '@nestjs/common';

import { FoodRepository } from '@app/repositories/food-repository';

import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class GetFoodByNameUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute(name: string) {
    const food = await this.foodRepository.findByName(name);

    if (!food) {
      throw new NotFoundError(`Food not found with name [${name}]`);
    }

    return { food };
  }
}
