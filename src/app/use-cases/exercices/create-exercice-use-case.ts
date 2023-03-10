import { Injectable } from '@nestjs/common';

import { Exercice, type ExerciceProps } from '@app/entities/exercice';
import { ExerciceRepository } from '@app/repositories/exercice-repository';

@Injectable()
export class CreateExerciceUseCase {
  constructor(private exerciceRepository: ExerciceRepository) {}

  async execute(props: ExerciceProps) {
    const exercice = new Exercice(props);

    await this.exerciceRepository.create(exercice);

    return { exercice };
  }
}
