import type { SearchFoods } from '@app/repositories/food-repository';
import { FoodRepository } from '@app/repositories/food-repository';

type ExecuteParams = SearchFoods;

export class SearchFoodsUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute(params: ExecuteParams = { page: 1, size: 10 }) {
    const foods = await this.foodRepository.search(params);

    return { foods };
  }
}
