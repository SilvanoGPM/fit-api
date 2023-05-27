import { Injectable } from '@nestjs/common';

import { NotFoundError } from '../errors/not-found.error';
import { Food } from '@app/entities/food';
import { FoodRepository } from '@app/repositories/food-repository';

interface ReplaceFoodProps {
  id: string;
  name: string;
  images?: string[];
  categoryId?: number;
  energy: number;
  fiber: number;
  protein: number;
  carbohydrate: number;
  lipid: number;
}

@Injectable()
export class ReplaceFoodUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute(props: ReplaceFoodProps) {
    const categories = await this.foodRepository.getCategories();

    const food = new Food({
      ...props,
      category: props.categoryId ? categories[props.categoryId] : 'Outros',
    });

    const exists = await this.foodRepository.save(food);

    if (!exists) {
      throw new NotFoundError(`Food not found with id [${props.id}]`);
    }

    return { food };
  }
}
