import { Injectable } from '@nestjs/common';

import { NotFoundError } from '../errors/not-found.error';
import { Food, type FoodProps } from '@app/entities/food';
import { FoodRepository } from '@app/repositories/food-repository';

type ExecuteParams = FoodProps & { id: string };

@Injectable()
export class ReplaceFoodUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async execute({ id, ...props }: ExecuteParams) {
    const food = new Food(props, id);

    const exists = await this.foodRepository.save(food);

    if (!exists) {
      throw new NotFoundError(`Food not found with id [${id}]`);
    }

    return { food };
  }
}
