import { Injectable } from '@nestjs/common';

import { FoodRepository } from '@app/repositories/food-repository';
import { GetFoodByIdUseCase } from './get-food-by-id-use-case';

interface AddFoodImageProps {
  id: string;
  image: string;
}

@Injectable()
export class AddFoodImageFoodUseCase {
  constructor(
    private foodRepository: FoodRepository,
    private getFoodById: GetFoodByIdUseCase,
  ) {}

  async execute({ id, image }: AddFoodImageProps) {
    const { food } = await this.getFoodById.execute(id);

    food.addImage(image);

    await this.foodRepository.save(food);

    return { food };
  }
}
