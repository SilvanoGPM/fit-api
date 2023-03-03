import { Injectable } from '@nestjs/common';

import type { Pageable } from '@app/repositories/pages.type';
import type { FoodRepository } from '@app/repositories/food-repository';

type ExecuteParams = Pageable;

@Injectable()
export class GetAllFoodsUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute(params: ExecuteParams = { page: 1, size: 10 }) {
    const foods = await this.foodRepository.findMany(params);

    return { foods };
  }
}
