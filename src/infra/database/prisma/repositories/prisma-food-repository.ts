import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Food } from '@app/entities/food';
import { FoodRepository, SearchFoods } from '@app/repositories/food-repository';
import { Pageable } from '@app/repositories/pages.type';

import { PrismaService } from '../prisma.service';
import { PrismaFoodMapper } from '../mappers/prisma-food-mapper';

interface GetPageParams {
  size: number;
  page: number;
  where?: Prisma.FoodWhereInput;
}

@Injectable()
export class PrismaFoodRepository implements FoodRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(pageable: Pageable) {
    return this.getPage(pageable);
  }

  async search({ page, size, ...query }: SearchFoods) {
    return this.getPage({
      page,
      size,
      where: {
        AND: {
          name: { contains: query.name },

          energy: {
            gte: query.energy?.min,
            lte: query.energy?.max,
          },

          carbohydrate: {
            gte: query.carbohydrate?.min,
            lte: query.carbohydrate?.max,
          },

          lipid: {
            gte: query.lipid?.min,
            lte: query.lipid?.max,
          },

          fiber: {
            gte: query.fiber?.min,
            lte: query.fiber?.max,
          },

          protein: {
            gte: query.protein?.min,
            lte: query.protein?.max,
          },
        },
      },
    });
  }

  async findByName(name: string) {
    const rawFood = await this.prisma.food.findFirst({
      where: { name },
    });

    if (!rawFood) {
      return null;
    }

    return PrismaFoodMapper.toDomain(rawFood);
  }

  async findById(id: string) {
    const rawFood = await this.prisma.food.findUnique({
      where: { id },
    });

    if (!rawFood) {
      return null;
    }

    return PrismaFoodMapper.toDomain(rawFood);
  }

  async create(food: Food) {
    const data = PrismaFoodMapper.toPrisma(food);

    await this.prisma.food.create({ data });
  }

  async save(food: Food) {
    const data = PrismaFoodMapper.toPrisma(food);

    const exists = await this.findById(food.id);

    if (!exists) {
      return false;
    }

    await this.prisma.food.update({ data, where: { id: food.id } });

    return true;
  }

  async getCategories(): Promise<Record<number, string>> {
    return {
      1: 'Cereais e derivados',
      2: 'Verduras, hortaliças e derivados',
      3: 'Frutas e derivados',
      4: 'Gorduras e óleos',
      5: 'Pescados e frutos do mar',
      6: 'Carnes e derivados',
      7: 'Leite e derivados',
      8: 'Bebidas (alcoólicas e não alcoólicas)',
      9: 'Ovos e derivados',
      10: 'Produtos açucarados',
      11: 'Miscelâneas',
      12: 'Outros alimentos industrializados',
      13: 'Alimentos preparados',
      14: 'Leguminosas e derivados',
      15: 'Nozes e sementes',
    };
  }

  private async getPage({ page, size, where }: GetPageParams) {
    const start = size * (page - 1);
    const end = start + size;

    const rawFoods = await this.prisma.food.findMany({
      skip: start,
      take: end,

      where,
    });

    const total = await this.prisma.food.count({ where });

    const data = rawFoods.map(PrismaFoodMapper.toDomain);

    return {
      data,
      total,
      page,
      size,
      hasNext: total > end,
    };
  }
}
