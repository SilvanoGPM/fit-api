import { Injectable } from '@nestjs/common';

import { Exercice, type ExerciceProps } from '@app/entities/exercice';
import { ExerciceRepository } from '@app/repositories/exercice-repository';

import { NotFoundError } from '../errors/not-found.error';

type ExecuteParams = ExerciceProps & { id: string };

@Injectable()
export class ReplaceExerciceUseCase {
  constructor(private exerciceRepository: ExerciceRepository) {}

  async execute(props: ExecuteParams) {
    const exercice = new Exercice(props);

    const exists = await this.exerciceRepository.save(exercice);

    if (!exists) {
      throw new NotFoundError(`Exercice not found with id [${props.id}]`);
    }

    return { exercice };
  }
}
