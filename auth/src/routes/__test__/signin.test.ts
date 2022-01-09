import request from 'supertest';
import { app } from '../../app';

it('Fails if an email does not exist is supplied', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('Fails if an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'incorrect_password',
    })
    .expect(400);
});

it('Respond with cookie on a successful signin', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
