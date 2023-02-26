import { Injectable } from '@nestjs/common';

import { ExerciceRepository } from '@app/repositories/exercice-repository';

import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class GetExerciceByNameUseCase {
  constructor(private exerciceRepository: ExerciceRepository) {}

  async execute(name: string) {
    const exercice = await this.exerciceRepository.findByName(name);

    if (!exercice) {
      throw new NotFoundError(`Exercice not found with name [${name}]`);
    }

    return { exercice };
  }
}
