import type { Food } from '@app/entities/food';
import type { Pageable } from '@app/repositories/pages.type';
import type { FoodRepository } from '@app/repositories/food-repository';

interface GetPageParams extends Pageable {
  foods: Food[];
}

export class InMemoryFoodRepository implements FoodRepository {
  constructor(public foods: Food[] = []) {}

  async findMany(params: Pageable) {
    return this.getPage({ foods: this.foods, ...params });
  }

  private getPage({ foods, page, size }: GetPageParams) {
    const start = size * (page - 1);
    const end = start + size;

    const total = foods.length;

    const data = foods.slice(start, end);

    const hasNext = Boolean(foods[end]);

    return {
      data,
      page,
      size,
      total,
      hasNext,
    };
  }
}
