import { Injectable } from '@nestjs/common';

import { Exercice, type ExerciceProps } from '@app/entities/exercice';
import { ExerciceRepository } from '@app/repositories/exercice-repository';

type ExecuteParams = ExerciceProps & { id: string };

@Injectable()
export class ReplaceExerciceUseCase {
  constructor(private exerciceRepository: ExerciceRepository) {}

  async execute({ id, ...props }: ExecuteParams) {
    const exercice = new Exercice(props, id);

    await this.exerciceRepository.save(exercice);

    return { exercice };
  }
}
