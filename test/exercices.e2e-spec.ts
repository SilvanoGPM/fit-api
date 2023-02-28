import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { ExerciceRepository } from '@app/repositories/exercice-repository';
import { Exercice } from '@app/entities/exercice';

import { AppModule } from '../src/app.module';
import { makeExercice } from './factories/exercice-factory';
import { InMemoryExerciceRepository } from './repositories/in-memory-exercice-repository';

function expectExercice({
  id,
  name,
  mode,
  difficulty,
  muscle,
  steps,
  videos,
}: Partial<Exercice> = {}) {
  return expect.objectContaining({
    _id: id ?? expect.any(String),
    name: name ?? expect.any(String),
    mode: mode ?? expect.any(String),
    difficulty: difficulty ?? expect.any(String),
    muscle: muscle ?? expect.any(String),

    steps: steps ?? expect.arrayContaining([expect.any(String)]),

    videos:
      videos ??
      expect.objectContaining({
        male: expect.arrayContaining([expect.any(String)]),
        female: expect.arrayContaining([expect.any(String)]),
      }),
  });
}

describe('ExerciceController (e2e)', () => {
  let app: INestApplication;
  const exerciceRepository = new InMemoryExerciceRepository([makeExercice()]);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ExerciceRepository)
      .useValue(exerciceRepository)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/exercices (GET, 200)', async () => {
    const response = await request(app.getHttpServer()).get('/exercices');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([expectExercice()]),
        page: expect.any(Number),
        size: expect.any(Number),
        total: expect.any(Number),
        hasNext: expect.any(Boolean),
      }),
    );
  });

  it('/exercices/search (GET, 200)', async () => {
    const firstResponse = await request(app.getHttpServer()).get(
      '/exercices/search',
    );

    expect(firstResponse.status).toBe(200);

    expect(firstResponse.body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([expectExercice()]),
        page: expect.any(Number),
        size: expect.any(Number),
        total: 1,
        hasNext: expect.any(Boolean),
      }),
    );

    const secondResponse = await request(app.getHttpServer()).get(
      '/exercices/search?name=random',
    );

    expect(secondResponse.status).toBe(200);

    expect(secondResponse.body).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        page: expect.any(Number),
        size: expect.any(Number),
        total: 0,
        hasNext: expect.any(Boolean),
      }),
    );
  });

  it('/exercices/:name (GET, 200)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/exercices/${makeExercice().name}`,
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        exercice: expectExercice(),
      }),
    );
  });

  it('/exercices/:name (GET, 404)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/exercices/random-name`,
    );

    expect(response.status).toBe(404);
  });

  it('/exercices (POST, 201)', async () => {
    const exericeToCreate = makeExercice({
      name: 'New Exercice Test',
    }).toJSON();

    const response = await request(app.getHttpServer())
      .post(`/exercices`)
      .send(exericeToCreate);

    expect(response.status).toBe(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        exercice: expectExercice(),
      }),
    );
  });

  it('/exercices (PUT, 200)', async () => {
    const { _id: id, ...exericeToReplace } =
      exerciceRepository.exercices[0].toJSON();

    const response = await request(app.getHttpServer())
      .put(`/exercices`)
      .send({ id, ...exericeToReplace, name: 'Exercice Updated Test' });

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        exercice: expectExercice({ name: 'Exercice Updated Test' }),
      }),
    );
  });

  it('/exercices (PUT, 404)', async () => {
    const { _id: id, ...exericeToReplace } = makeExercice().toJSON();

    const response = await request(app.getHttpServer())
      .put(`/exercices`)
      .send({ id, ...exericeToReplace });

    expect(response.status).toBe(404);
  });
});
