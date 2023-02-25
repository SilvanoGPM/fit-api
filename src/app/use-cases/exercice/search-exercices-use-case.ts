import { Injectable } from '@nestjs/common';

import {
  ExerciceRepository,
  type SearchExercice,
} from '@app/repositories/exercice-repository';

type ExecuteParams = SearchExercice;

@Injectable()
export class SearchExercicesUseCase {
  constructor(private exerciceRepository: ExerciceRepository) {}

  async execute(params: ExecuteParams = { page: 1, size: 10 }) {
    const exercices = await this.exerciceRepository.search(params);

    return { exercices };
  }
}
