import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { IoService } from '../io.service';

import { InMemoryFoodRepository } from '@test/repositories/in-memory-food-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';
import { Food } from '@app/entities/food';

import './data/foods.json';
import './data/categories.json';

interface Category {
  id: number;
  name: string;
}

interface RawMacro {
  qty: number;
  unit: string;
}

@Injectable()
export class StaticFoodRepository extends InMemoryFoodRepository {
  constructor(private io: IoService, utils: RepositoryUtils<Food>) {
    super([], utils);

    this.loadData();
  }

  private async loadData() {
    const categories = await this.getCategories();

    const path = join(__dirname, 'data', 'foods.json');

    const foods = await this.io.read<any>({ path });

    for (const rawFood of foods) {
      const food = new Food(
        {
          name: rawFood.description,
          baseQuantity: rawFood.base_qty,
          baseUnit: rawFood.base_unit,
          category:
            categories.find(({ id }) => rawFood.category_id === id)?.name || '',
          protein: this.mapMacro(rawFood.attributes.protein),
          carbohydrate: this.mapMacro(rawFood.attributes.carbohydrate),
          lipid: this.mapMacro(rawFood.attributes.lipid),
          fiber: this.mapMacro(rawFood.attributes.fiber),
          energy: rawFood.attributes.energy,
        },
        String(rawFood.id),
      );

      this.foods.push(food);
    }
  }

  private async getCategories() {
    const path = join(__dirname, 'data', 'categories.json');

    const rawCategories = await this.io.read<any>({ path });

    return rawCategories.map(
      ({ id, category }: { id: number; category: string }) => ({
        id,
        name: category,
      }),
    ) as Category[];
  }

  private mapMacro(macro: RawMacro) {
    if (!macro) {
      return { quantity: 0, unit: 'g' };
    }

    return { quantity: macro.qty, unit: macro.unit };
  }
}
