import { Controller, Get, Param, Query } from '@nestjs/common';

import { GetAllFoodsUseCase } from '@app/use-cases/foods/get-all-foods-use-case';
import { GetFoodByNameUseCase } from '@app/use-cases/foods/get-food-by-name-use-case';
import { Pageable } from '@app/repositories/pages.type';

import { SearchFoods } from '@app/repositories/food-repository';
import { SearchFoodsUseCase } from '@app/use-cases/foods/search-foods-use-case';
import { Replace } from '@helpers/replace';

import { GenericService } from '../services/generic.service';
import { FoodNotFoundError } from '../errors/food-not-found.error';

type RawSearchFoods = Replace<
  SearchFoods,
  {
    protein?: string;
    carbohydrate?: string;
    lipid?: string;
    fiber?: string;
    energy?: string;
  }
>;

@Controller('foods')
export class FoodController {
  constructor(
    private getAllFoods: GetAllFoodsUseCase,
    private searchFoods: SearchFoodsUseCase,
    private getFoodByName: GetFoodByNameUseCase,
    private genericService: GenericService,
  ) {}

  @Get()
  async getAll(@Query() query: Pageable) {
    const params = this.genericService.getPageParamsByQuery(query);

    const { foods } = await this.getAllFoods.execute(params);

    return foods;
  }

  @Get('search')
  async search(
    @Query() { page, size, name, category, ...rawRanges }: RawSearchFoods,
  ) {
    const params = this.genericService.getPageParamsByQuery({ page, size });

    const ranges = Object.entries(rawRanges).reduce((ranges, [key, value]) => {
      ranges[key] = this.genericService.formatRange(value);

      return ranges;
    }, {} as SearchFoods);

    const { foods } = await this.searchFoods.execute({
      name,
      category,
      ...ranges,
      ...params,
    });

    return foods;
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    try {
      const { food } = await this.getFoodByName.execute(name);

      return { food };
    } catch (error) {
      throw new FoodNotFoundError(error);
    }
  }
}
