import type { Food } from '@app/entities/food';
import type { Pageable } from '@app/repositories/pages.type';
import type { FoodRepository } from '@app/repositories/food-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';

export class InMemoryFoodRepository implements FoodRepository {
  constructor(
    public foods: Food[] = [],
    private utils: RepositoryUtils<Food>,
  ) {}

  async findMany(params: Pageable) {
    return this.utils.getPage({ data: this.foods, ...params });
  }

  async findByName(name: string) {
    return this.utils.findByString({
      data: this.foods,
      property: 'name',
      search: name,
    });
  }
}
