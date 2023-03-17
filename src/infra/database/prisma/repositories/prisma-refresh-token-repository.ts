import { Prisma } from '@prisma/client';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { RefreshToken } from '@app/entities/refresh-token';
import { User } from '@app/entities/user';
import { Pageable } from '@app/repositories/pages.type';
import { RefreshTokenRepository } from '@app/repositories/refresh-token-repository';

import { PrismaService } from '../prisma.service';
import { PrismaRefreshTokenMapper } from '../mappers/prisma-refresh-token-mapper';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

interface GetPageParams {
  size: number;
  page: number;
  where?: Prisma.RefreshTokenWhereInput;
}

const globalInclude = {
  user: true,
};

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async findManyByUser(user: User, pageable: Pageable) {
    return this.getPage({
      ...pageable,

      where: {
        userId: user.id,
      },
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const rawRefreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: globalInclude,
    });

    if (!rawRefreshToken) {
      return null;
    }

    return PrismaRefreshTokenMapper.toDomain(rawRefreshToken);
  }

  async create(refreshToken: RefreshToken) {
    const data = PrismaRefreshTokenMapper.toPrisma(refreshToken);

    await this.prisma.refreshToken.create({ data });
  }

  async delete(refreshToken: RefreshToken) {
    await this.prisma.refreshToken.delete({
      where: {
        token: refreshToken.token,
      },
    });
  }

  async sign(payload: { sub: string }, expiresIn?: string | number) {
    return this.jwtService.sign(payload, {
      expiresIn,
    });
  }

  async verify(token: string) {
    const { sub } = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    return { sub };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    const isSamePassword = user && (await compare(password, user.password));

    if (!isSamePassword) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  private async getPage({ page, size, where }: GetPageParams) {
    const start = size * (page - 1);
    const end = start + size;

    const rawRefreshTokens = await this.prisma.refreshToken.findMany({
      skip: start,
      take: end,

      where,

      include: globalInclude,
    });

    const total = await this.prisma.refreshToken.count({ where });

    const data = rawRefreshTokens.map(PrismaRefreshTokenMapper.toDomain);

    return {
      data,
      total,
      page,
      size,
      hasNext: total > end,
    };
  }
}
