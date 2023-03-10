import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Exercice } from '@app/entities/exercice';
import { Pageable } from '@app/repositories/pages.type';

import {
  ExerciceRepository,
  SearchExercice,
} from '@app/repositories/exercice-repository';

import { PrismaService } from '../prisma.service';
import { PrismaExerciceMapper } from '../mappers/prisma-exercice-mapper';

interface GetPageParams {
  size: number;
  page: number;
  where?: Prisma.ExerciceWhereInput;
}

const globalInclude = {
  steps: true,
  videos: {
    include: {
      videos: true,
    },
  },
};

@Injectable()
export class PrismaExerciceRepository implements ExerciceRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page, size }: Pageable) {
    return this.getPage({ page, size });
  }

  async findById(id: string) {
    const rawExercice = await this.prisma.exercice.findUnique({
      where: { id },
      include: globalInclude,
    });

    if (!rawExercice) {
      return null;
    }

    return PrismaExerciceMapper.toDomain(rawExercice);
  }

  async search({ page, size, ...query }: SearchExercice) {
    return this.getPage({
      page,
      size,
      where: {
        AND: {
          name: {
            contains: query.name,
          },

          difficulty: {
            contains: query.difficulty,
          },

          mode: {
            contains: query.mode,
          },

          muscle: {
            contains: query.muscle,
          },
        },
      },
    });
  }

  async create(exercice: Exercice): Promise<void> {
    const data = PrismaExerciceMapper.toPrisma(exercice);

    await this.prisma.exercice.create({ data });
  }

  async save(exercice: Exercice) {
    const data = PrismaExerciceMapper.toPrisma(exercice);

    const exists = await this.findById(exercice.id);

    if (!exists) {
      return false;
    }

    await this.prisma.exercice.update({
      data,
      where: { id: exercice.id },
    });

    return true;
  }

  private async getPage({ page, size, where }: GetPageParams) {
    const start = size * (page - 1);
    const end = start + size;

    const rawExercices = await this.prisma.exercice.findMany({
      skip: start,
      take: end,

      where,

      include: globalInclude,
    });

    const total = await this.prisma.exercice.count({ where });

    const data = rawExercices.map(PrismaExerciceMapper.toDomain);

    return {
      data,
      total,
      page,
      size,
      hasNext: total > end,
    };
  }
}
