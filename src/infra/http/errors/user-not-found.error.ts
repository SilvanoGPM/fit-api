import { NotFoundException } from '@nestjs/common';

export class UserFoodNotFoundError extends NotFoundException {
  constructor(error: any) {
    super('User not found', {
      cause: error,
      description: error.message,
    });
  }
}
