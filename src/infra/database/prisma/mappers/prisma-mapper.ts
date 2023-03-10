import { Exercice as PrismaExercice, Step, Video } from '@prisma/client';

import { Exercice } from '@app/entities/exercice';

export class PrismaMapper {
  static toDomain(
    rawExercice: PrismaExercice & {
      steps: Step[];
      videos: { videos: Video[] };
    },
  ) {
    const videos = PrismaMapper.getDomainVideos(rawExercice.videos.videos);

    return new Exercice(
      {
        name: rawExercice.name,
        difficulty: rawExercice.difficulty,
        mode: rawExercice.mode,
        muscle: rawExercice.muscle,
        steps: rawExercice.steps.map(({ description }) => description),
        videos,
      },
      rawExercice.id,
    );
  }

  static toPrisma(exercice: Exercice) {
    const videos = this.getPrismaVideos(exercice);

    return {
      id: exercice.id,
      name: exercice.name,
      difficulty: exercice.difficulty,
      mode: exercice.mode,
      muscle: exercice.muscle,

      steps: {
        create: exercice.steps.map((step) => ({ description: step })),
      },

      videos: {
        create: {
          videos: {
            create: videos,
          },
        },
      },
    };
  }

  private static getPrismaVideos(exercice: Exercice) {
    function toPrismaVideo(category: string) {
      return (url: string) => ({
        category,
        url,
      });
    }

    return [
      ...exercice.videos.female.map(toPrismaVideo('female')),
      ...exercice.videos.male.map(toPrismaVideo('male')),
    ];
  }

  private static getDomainVideos(videos: Video[]) {
    return videos.reduce(
      (acc, video) => {
        if (video.category === 'male') {
          acc.male.push(video.url);
        } else {
          acc.female.push(video.url);
        }

        return acc;
      },
      { male: [], female: [] } as { male: string[]; female: string[] },
    );
  }
}
