import { Injectable } from '@nestjs/common';

import { ExerciceRepository } from '@app/repositories/exercice-repository';

import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class GetExerciceByIdUseCase {
  constructor(private exerciceRepository: ExerciceRepository) {}

  async execute(id: string) {
    const exercice = await this.exerciceRepository.findById(id);

    if (!exercice) {
      throw new NotFoundError(`Exercice not found with id [${id}]`);
    }

    return { exercice };
  }
}
