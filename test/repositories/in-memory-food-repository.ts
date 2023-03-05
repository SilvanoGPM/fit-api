import type { Food } from '@app/entities/food';
import type { Pageable } from '@app/repositories/pages.type';
import type {
  FoodRepository,
  SearchFoods,
} from '@app/repositories/food-repository';
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

  async search({
    name,
    category,
    baseQuantity,
    carbohydrate,
    energy,
    fiber,
    lipid,
    protein,
    ...pageable
  }: SearchFoods) {
    const getFoods = (foods: Food[]) => {
      const allParamsUndefined = [
        name,
        baseQuantity,
        carbohydrate,
        category,
        energy,
        fiber,
        lipid,
        protein,
      ].every((param) => param === undefined);

      if (allParamsUndefined) {
        return foods;
      }

      return foods.filter((food) => {
        const hasName = this.utils.like(food.name, name);
        const hasCategory = this.utils.like(food.category, category);

        const hasBaseQuantity = this.utils.range({
          value: food.baseQuantity,
          ...baseQuantity,
        });

        const hasCarbohydrate = this.utils.range({
          value: food.carbohydrate.quantity,
          ...carbohydrate,
        });

        const hasProtein = this.utils.range({
          value: food.protein.quantity,
          ...protein,
        });

        const hasLipid = this.utils.range({
          value: food.lipid.quantity,
          ...lipid,
        });

        const hasFiber = this.utils.range({
          value: food.fiber.quantity,
          ...fiber,
        });

        const hasEnergy = this.utils.range({
          value: food.energy.kcal,
          ...energy,
        });

        const shouldPass =
          hasName &&
          hasCategory &&
          hasBaseQuantity &&
          hasCarbohydrate &&
          hasProtein &&
          hasLipid &&
          hasFiber &&
          hasEnergy;

        return shouldPass;
      });
    };

    return this.utils.getPage({ data: getFoods(this.foods), ...pageable });
  }

  async create(food: Food) {
    this.foods.push(food);
  }
}
