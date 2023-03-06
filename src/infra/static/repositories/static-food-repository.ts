import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { IoService } from '../io.service';

import { InMemoryFoodRepository } from '@test/repositories/in-memory-food-repository';
import { RepositoryUtils } from '@test/utils/repository-utils';
import { Food } from '@app/entities/food';

interface RawMacro {
  qty: number;
  unit: string;
}

import './data/foods.json';
import './data/categories.json';

@Injectable()
export class StaticFoodRepository extends InMemoryFoodRepository {
  constructor(private io: IoService, utils: RepositoryUtils<Food>) {
    super([], utils);

    this.loadData();
  }

  private async loadData() {
    await this.loadCategories();

    const path = join(__dirname, 'data', 'foods.json');

    const foods = await this.io.read<any>({ path });

    for (const rawFood of foods) {
      const food = new Food(
        {
          name: rawFood.description,
          category: this.categories[rawFood.category_id],
          protein: this.mapMacro(rawFood.attributes.protein),
          carbohydrate: this.mapMacro(rawFood.attributes.carbohydrate),
          lipid: this.mapMacro(rawFood.attributes.lipid),
          fiber: this.mapMacro(rawFood.attributes.fiber),
          energy: rawFood.attributes.energy.kcal,
        },
        String(rawFood.id),
      );

      this.foods.push(food);
    }
  }

  private async loadCategories() {
    const path = join(__dirname, 'data', 'categories.json');

    const rawCategories = await this.io.read<any>({ path });

    for (const rawCategory of rawCategories) {
      this.categories[rawCategory.id] = rawCategory.category;
    }
  }

  private mapMacro(macro: RawMacro) {
    return macro ? macro.qty : 0;
  }
}
