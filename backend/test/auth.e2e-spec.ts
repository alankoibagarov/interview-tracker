import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import * as bcrypt from 'bcryptjs';

describe('Auth e2e', () => {
  let app: INestApplication;

  const usersMock = {
    findOne: jest.fn(),
  } as Partial<UsersService> as UsersService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/login success', async () => {
    usersMock.findOne = jest.fn().mockResolvedValue({
      id: 1,
      username: 'user',
      passwordHash: await bcrypt.hash('pass', 10),
    });

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user', password: 'pass' })
      .expect(200);

    expect(res.body.access_token).toBeDefined();
  });

  it('POST /auth/login failure', async () => {
    usersMock.findOne = jest.fn().mockResolvedValue(null);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user', password: 'wrong' })
      .expect(401);
  });
});
