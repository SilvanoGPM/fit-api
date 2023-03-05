import { NotFoundException } from '@nestjs/common';

export class FoodNotFoundError extends NotFoundException {
  constructor(error: any) {
    super('Food not found', {
      cause: error,
      description: error.message,
    });
  }
}
