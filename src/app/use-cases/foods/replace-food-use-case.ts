import { Injectable } from '@nestjs/common';

import { NotFoundError } from '../errors/not-found.error';
import { Food } from '@app/entities/food';
import { FoodRepository } from '@app/repositories/food-repository';

interface ReplaceFoodProps {
  id: string;
  name: string;
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

  async execute({ id, ...props }: ReplaceFoodProps) {
    const categories = await this.foodRepository.getCategories();

    const food = new Food(
      {
        name: props.name,
        category: props.categoryId ? categories[props.categoryId] : 'Outros',
        baseQuantity: 100,
        baseUnit: 'g',

        energy: {
          kcal: props.energy,
          kj: props.energy / 0.2390057,
        },

        carbohydrate: {
          quantity: props.carbohydrate,
          unit: 'g',
        },

        protein: {
          quantity: props.protein,
          unit: 'g',
        },

        lipid: {
          quantity: props.lipid,
          unit: 'g',
        },

        fiber: {
          quantity: props.fiber,
          unit: 'g',
        },
      },
      id,
    );

    const exists = await this.foodRepository.save(food);

    if (!exists) {
      throw new NotFoundError(`Food not found with id [${id}]`);
    }

    return { food };
  }
}
