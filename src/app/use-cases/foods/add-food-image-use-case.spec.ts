import { makeRepository, makeFood } from '@test/factories/food-factory';

import { NotFoundError } from '../errors/not-found.error';
import { GetFoodByIdUseCase } from './get-food-by-id-use-case';
import { AddFoodImageFoodUseCase } from './add-food-image-use-case';

describe('AddFoodImage use case', () => {
  it('should be able to add a food image', async () => {
    const initialFood = makeFood();

    const foodRepository = makeRepository([initialFood]);

    const getFoodById = new GetFoodByIdUseCase(foodRepository);

    const addFoodImage = new AddFoodImageFoodUseCase(
      foodRepository,
      getFoodById,
    );

    const { food } = await addFoodImage.execute({
      id: initialFood.id,
      image: 'test-image',
    });

    expect(foodRepository.foods).toHaveLength(1);
    expect(foodRepository.foods[0]).toEqual(food);
    expect(foodRepository.foods[0].images).toHaveLength(1);
  });

  it('should not be able to replace a food when it does not exists', async () => {
    const foodRepository = makeRepository();

    const getFoodById = new GetFoodByIdUseCase(foodRepository);

    const addFoodImage = new AddFoodImageFoodUseCase(
      foodRepository,
      getFoodById,
    );

    expect(() => {
      return addFoodImage.execute({ id: 'random-id', image: 'test-image' });
    }).rejects.toThrow(NotFoundError);
  });
});
