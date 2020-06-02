import request from 'supertest';
import server from './server';

describe('server', () => {
  it('[GET] / for valid endpoints works', async () => {
    const res = await request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toEqual({
      status: 200,
      message: 'Hello from your Backend Engineer!',
    });
  });
  it('[GET] / Fails if endpoint is invalid', (done) => request(server)
    .get('/wrong')
    .expect(404)
    .end(done));
});
