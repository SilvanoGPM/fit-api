import { NotFoundException } from '@nestjs/common';

export class ExerciceNotFoundError extends NotFoundException {
  constructor(error: any) {
    super('Exercice not found', {
      cause: error,
      description: error.message,
    });
  }
}
