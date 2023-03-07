import { Injectable } from '@nestjs/common';

import { FoodRepository } from '@app/repositories/food-repository';

import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class GetFoodByIdUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute(id: string) {
    const food = await this.foodRepository.findById(id);

    if (!food) {
      throw new NotFoundError(`Food not found with id [${id}]`);
    }

    return { food };
  }
}
