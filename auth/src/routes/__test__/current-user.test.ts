import request from 'supertest';
import { app } from '../../app';

it('Responds with current user details', async () => {
  const authCookie = await global.getAuthCookie();

  const response = await request(app)
    .get('/api/auth/current-user')
    .set('Cookie', authCookie)
    .send()
    .expect(400);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('Responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/auth/current-user')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
