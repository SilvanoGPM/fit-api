import { Exercice } from '@app/entities/exercice';

import { Page, Pageable } from './pages.type';

interface SearchExercice extends Partial<Pageable> {
  mode?: string;
  muscle?: string;
  name?: string;
}

export abstract class ExerciceRepository {
  abstract findMany(params: Pageable): Page<Exercice>;
  abstract search(params: SearchExercice): Page<Exercice>;
  abstract create(exercice: Exercice): void;
  abstract save(exercice: Exercice): void;
}
