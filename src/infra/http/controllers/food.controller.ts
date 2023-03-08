import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { GetAllFoodsUseCase } from '@app/use-cases/foods/get-all-foods-use-case';
import { GetFoodByNameUseCase } from '@app/use-cases/foods/get-food-by-name-use-case';
import { Pageable } from '@app/repositories/pages.type';
import { SearchFoods } from '@app/repositories/food-repository';
import { SearchFoodsUseCase } from '@app/use-cases/foods/search-foods-use-case';
import { Replace } from '@helpers/replace';
import { CreateFoodUseCase } from '@app/use-cases/foods/create-food-use-case';
import { ReplaceFoodUseCase } from '@app/use-cases/foods/replace-food-use-case';
import { GetAllCategoriesUseCase } from '@app/use-cases/foods/get-all-categories-use-case';
import { GetFoodByIdUseCase } from '@app/use-cases/foods/get-food-by-id-use-case';

import { GenericService } from '../services/generic.service';
import { FoodNotFoundError } from '../errors/food-not-found.error';
import { CreateFoodDTO } from '../dtos/foods/create-food.dto';
import { ReplaceFoodDTO } from '../dtos/foods/replace-food.dto';

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

@ApiTags('Comidas')
@Controller('foods')
export class FoodController {
  constructor(
    private getAllFoods: GetAllFoodsUseCase,
    private getAllCategories: GetAllCategoriesUseCase,
    private searchFoods: SearchFoodsUseCase,
    private getFoodByName: GetFoodByNameUseCase,
    private getFoodById: GetFoodByIdUseCase,
    private createFood: CreateFoodUseCase,
    private replaceFood: ReplaceFoodUseCase,
    private genericService: GenericService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos as comidas com paginação.' })
  @ApiOkResponse({ description: 'Comidas encontradas com sucesso' })
  async getAll(@Query() query: Pageable) {
    const params = this.genericService.getPageParamsByQuery(query);

    const { foods } = await this.getAllFoods.execute(params);

    return foods;
  }

  @Get('categories')
  @ApiOperation({ summary: 'Retorna todas as categorias.' })
  @ApiOkResponse({ description: 'Categorias encontradas com sucesso' })
  async _getAllCategories() {
    const { categories } = await this.getAllCategories.execute();

    return categories;
  }

  @Get('search')
  @ApiOperation({ summary: 'Pesquisa comidas com paginação.' })
  @ApiOkResponse({ description: 'Comidas encontradas com sucesso' })
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

  @Get(':name/name')
  @ApiOperation({ summary: 'Retorna uma comida pelo nome.' })
  @ApiOkResponse({ description: 'Comida encontrada com sucesso' })
  @ApiNotFoundResponse({ description: 'Nenhuma comida encontrada' })
  async findByName(@Param('name') name: string) {
    try {
      const { food } = await this.getFoodByName.execute(name);

      return { food };
    } catch (error) {
      throw new FoodNotFoundError(error);
    }
  }

  @Get(':id/id')
  @ApiOperation({ summary: 'Retorna uma comida pelo identificador.' })
  @ApiOkResponse({ description: 'Comida encontrada com sucesso' })
  @ApiNotFoundResponse({ description: 'Nenhuma comida encontrada' })
  async findById(@Param('id') id: string) {
    try {
      const { food } = await this.getFoodById.execute(id);

      return { food };
    } catch (error) {
      throw new FoodNotFoundError(error);
    }
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Persiste uma nova comida.' })
  @ApiCreatedResponse({ description: 'Comida foi criada com sucesso' })
  @ApiUnprocessableEntityResponse({
    description: 'Campo inválido na criação da comida',
  })
  async create(@Body() createFoodDto: CreateFoodDTO) {
    const { name, categoryId, energy, carbohydrate, fiber, lipid, protein } =
      createFoodDto;

    const { food } = await this.createFood.execute({
      name,
      categoryId,
      energy,
      carbohydrate,
      fiber,
      lipid,
      protein,
    });

    return { food };
  }

  @Put()
  @ApiOperation({ summary: 'Atualiza uma comida.' })
  @ApiOkResponse({ description: 'Comida atualizada com sucesso' })
  @ApiNotFoundResponse({ description: 'Nenhuma comida encontrada' })
  @ApiUnprocessableEntityResponse({
    description: 'Campo inválido na atualiza da comida',
  })
  async replace(@Body() replaceFoodDto: ReplaceFoodDTO) {
    const {
      id,
      name,
      categoryId,
      energy,
      carbohydrate,
      fiber,
      lipid,
      protein,
    } = replaceFoodDto;

    try {
      const { food } = await this.replaceFood.execute({
        id,
        name,
        categoryId,
        energy,
        carbohydrate,
        fiber,
        lipid,
        protein,
      });

      return { food };
    } catch (error) {
      throw new FoodNotFoundError(error);
    }
  }
}
