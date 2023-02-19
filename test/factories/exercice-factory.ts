import { Exercice } from '@app/entities/exercice';

export function makeExercice(exercice: Partial<Exercice> = {}) {
  return new Exercice({
    name: exercice.name ?? 'test-name',
    mode: exercice.mode ?? 'test-mode',
    muscle: exercice.muscle ?? 'test-muscle',
    steps: exercice.steps ?? ['test-first-step'],
    videos: exercice.videos ?? {
      male: 'test-male-video',
      female: 'test-female-video',
    },
  });
}
