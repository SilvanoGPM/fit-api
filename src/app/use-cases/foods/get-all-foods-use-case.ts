import { Injectable } from '@nestjs/common';
import { FoodRepository } from '@app/repositories/food-repository';

import type { Pageable } from '@app/repositories/pages.type';

type ExecuteParams = Pageable;

@Injectable()
export class GetAllFoodsUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute(params: ExecuteParams = { page: 1, size: 10 }) {
    const foods = await this.foodRepository.findMany(params);

    return { foods };
  }
}
