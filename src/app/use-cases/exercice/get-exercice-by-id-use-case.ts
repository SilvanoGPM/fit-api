import { ExerciceRepository } from '@app/repositories/exercice-repository';

export class GetExerciceByIdUseCase {
  constructor(private exerciceRepository: ExerciceRepository) {}

  async execute(id: string) {
    const exercice = await this.exerciceRepository.findById(id);

    return { exercice };
  }
}
