import { ExerciceRepository } from '@app/repositories/exercice-repository';
import { Pageable } from '@app/repositories/pages.type';

type ExecuteParams = Pageable;

export class GetAllExercicesUseCase {
  constructor(private exerciceRepository: ExerciceRepository) {}

  async execute(params: ExecuteParams = { page: 1, size: 10 }) {
    const exercices = await this.exerciceRepository.findMany(params);

    return { exercices };
  }
}
