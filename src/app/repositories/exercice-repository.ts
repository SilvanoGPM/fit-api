import { Exercice } from '@app/entities/exercice';

import type { Page, Pageable } from './pages.type';

export interface SearchExercice extends Pageable {
  mode?: string;
  muscle?: string;
  difficulty?: string;
  name?: string;
}

export abstract class ExerciceRepository {
  abstract findMany(pageable: Pageable): Promise<Page<Exercice>>;
  abstract findByName(name: string): Promise<Exercice | null>;
  abstract search(pageable: SearchExercice): Promise<Page<Exercice>>;
  abstract create(exercice: Exercice): Promise<void>;
  abstract save(exercice: Exercice): Promise<boolean>;
}
