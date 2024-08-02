import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  const valid_user = { id: 5, email: 'teste@email.com', password: 'teste' };
  const invalid_user = {
    id: 1,
    email: 'invalid_email',
    password: 'invalid_password',
  };
  let valid_token: string;
  let wallet: any;
  let investment: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    valid_token = jwtService.sign({
      sub: valid_user.id,
      username: valid_user.email,
    });
  });

  it('should /POST login wih a valid user', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send(valid_user)
      .expect(200);
  });

  it('should not /POST login wih an invalid user', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send(invalid_user)
      .expect(400);
  });

  it('should /GET users', async () => {
    await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${valid_token}`)
      .expect(200);
  });

  it('should not /GET users with invalid token', async () => {
    const token = 'invalid_token';
    await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
  });

  it('should /GET user by email', async () => {
    await request(app.getHttpServer())
      .get('/user/' + valid_user.email)
      .set('Authorization', `Bearer ${valid_token}`)
      .expect(200);
  });

  it('should /POST create user', async () => {
    const create_user = {
      id: 1,
      email: 'test@email.com',
      password: 'password',
    };
    const newUser = await request(app.getHttpServer())
      .post('/user/')
      .send(create_user)
      .expect(201);

    await request(app.getHttpServer())
      .delete('/user/' + newUser.body.id)
      .set('Authorization', `Bearer ${valid_token}`)
      .expect(200);
  });

  it('should /GET wallets by user email', async () => {
    await request(app.getHttpServer())
      .get('/wallet/' + valid_user.email)
      .set('Authorization', `Bearer ${valid_token}`)
      .expect(200);
  });

  it('should /POST create a wallet', async () => {
    const create_wallet = {
      user: 'teste@email.com',
      name: 'test_wallet',
    };
    wallet = await request(app.getHttpServer())
      .post('/wallet/')
      .set('Authorization', `Bearer ${valid_token}`)
      .send(create_wallet)
      .expect(201);
  });

  it('should /PATCH a wallet', async () => {
    const update_wallet = {
      id: wallet.body.id,
      name: 'test_wallet_update',
    };
    wallet = await request(app.getHttpServer())
      .patch('/wallet/')
      .set('Authorization', `Bearer ${valid_token}`)
      .send(update_wallet)
      .expect(200);
  });

  it('should /POST create an investment', async () => {
    const create_investment = {
      company: 'empresa_teste',
      amount: 100,
      wallet: wallet.body.id,
    };
    await request(app.getHttpServer())
      .post('/investment/')
      .set('Authorization', `Bearer ${valid_token}`)
      .send(create_investment)
      .expect(201);
  });

  it('should /GET investments by wallet', async () => {
    await request(app.getHttpServer())
      .get('/investment/' + wallet.body.id)
      .set('Authorization', `Bearer ${valid_token}`)
      .expect(200);
  });

  it('should /DELETE a wallet', async () => {
    await request(app.getHttpServer())
      .delete('/wallet/' + wallet.body.id)
      .set('Authorization', `Bearer ${valid_token}`)
      .expect(200);
  });
});
