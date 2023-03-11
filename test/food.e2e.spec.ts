import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { FoodRepository } from '@app/repositories/food-repository';
import { Food } from '@prisma/client';

import { InMemoryFoodRepository } from './repositories/in-memory-food-repository';
import { RepositoryUtils } from './utils/repository-utils';
import { makeFood } from './factories/food-factory';

function expectFood({
  id,
  name,
  carbohydrate,
  category,
  energy,
  fiber,
  lipid,
  protein,
}: Partial<Food> = {}) {
  return expect.objectContaining({
    _id: id ?? expect.any(String),
    name: name ?? expect.any(String),
    category: category ?? expect.any(String),

    energy:
      energy ??
      expect.objectContaining({
        kcal: expect.any(Number),
        kj: expect.any(Number),
      }),

    carbohydrate:
      carbohydrate ??
      expect.objectContaining({
        unit: expect.any(String),
        quantity: expect.any(Number),
      }),

    fiber:
      fiber ??
      expect.objectContaining({
        unit: expect.any(String),
        quantity: expect.any(Number),
      }),

    lipid:
      lipid ??
      expect.objectContaining({
        unit: expect.any(String),
        quantity: expect.any(Number),
      }),

    protein:
      protein ??
      expect.objectContaining({
        unit: expect.any(String),
        quantity: expect.any(Number),
      }),
  });
}

describe('ExerciceController (e2e)', () => {
  let app: INestApplication;

  const foodRepository = new InMemoryFoodRepository([], new RepositoryUtils(), {
    1: 'test-category',
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FoodRepository)
      .useValue(foodRepository)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    foodRepository.foods = [];

    await app.close();
  });

  it('/foods (GET, 200)', async () => {
    foodRepository.foods.push(makeFood());

    const response = await request(app.getHttpServer()).get('/foods');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([expectFood()]),
        page: expect.any(Number),
        size: expect.any(Number),
        total: expect.any(Number),
        hasNext: expect.any(Boolean),
      }),
    );
  });

  it('/foods/categories (GET, 200)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/foods/categories',
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        { id: expect.any(Number), name: expect.any(String) },
      ]),
    );
  });

  it('/foods/search (GET, 200)', async () => {
    foodRepository.foods.push(makeFood());

    const response = await request(app.getHttpServer()).get('/foods/search');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([expectFood()]),
        page: expect.any(Number),
        size: expect.any(Number),
        total: expect.any(Number),
        hasNext: expect.any(Boolean),
      }),
    );

    const secondResponse = await request(app.getHttpServer()).get(
      '/foods/search?name=random',
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

  it('/foods/:name/name (GET, 200)', async () => {
    const food = makeFood();

    foodRepository.foods.push(food);

    const response = await request(app.getHttpServer()).get(
      `/foods/${food.name}/name`,
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        food: expectFood(),
      }),
    );
  });

  it('/foods/:name/name (GET, 404)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/foods/random-name/name`,
    );

    expect(response.status).toBe(404);
  });

  it('/foods/:id/id (GET, 200)', async () => {
    const food = makeFood();

    foodRepository.foods.push(food);

    const response = await request(app.getHttpServer()).get(
      `/foods/${food.id}/id`,
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        food: expectFood(),
      }),
    );
  });

  it('/foods/:name/name (GET, 404)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/foods/random-id/id`,
    );

    expect(response.status).toBe(404);
  });

  it('/foods (POST, 201)', async () => {
    const response = await request(app.getHttpServer()).post(`/foods`).send({
      name: 'New Food Test',
      category: 'test-category',
      energy: 100,
      carbohydrate: 100,
      lipid: 100,
      fiber: 100,
      protein: 100,
    });

    expect(response.status).toBe(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        food: expectFood(),
      }),
    );
  });

  it('/foods (PUT, 200)', async () => {
    const food = makeFood();

    foodRepository.foods.push(food);

    const response = await request(app.getHttpServer()).put(`/foods`).send({
      id: food.id,
      name: 'Food Updated Test',
      category: 'test-category',
      energy: 100,
      carbohydrate: 100,
      lipid: 100,
      fiber: 100,
      protein: 100,
    });

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        food: expectFood(),
      }),
    );
  });

  it('/foods (PUT, 404)', async () => {
    const response = await request(app.getHttpServer()).put(`/foods`).send({
      id: 'random-id',
      name: 'Food Updated Test',
      category: 'test-category',
      energy: 100,
      carbohydrate: 100,
      lipid: 100,
      fiber: 100,
      protein: 100,
    });

    expect(response.status).toBe(404);
  });
});
