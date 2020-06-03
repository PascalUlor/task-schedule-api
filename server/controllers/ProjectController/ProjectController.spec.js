import request from 'supertest';
import server from '../../api/server';
import mockProjects from '../../database/mock/projects.mock';
import mockUsers from '../../database/mock/user.mock';
import winston from '../../config/winston';

const baseUrl = '/api';
const app = request(server);

// let token;
// let token2;

// beforeEach(async () => {
//   const res = await app
//     .post(`${baseUrl}/users`)
//     .set('Content-Type', 'application/json')
//     .send(mockUsers.validInput3);
//   token = res.body.body?.token;

//   const res2 = await app
//     .post(`${baseUrl}/users`)
//     .set('Content-Type', 'application/json')
//     .send(mockUsers.validInput4);
//   token2 = res2.body.body?.token;
// });

describe('[POST] and  [GET] /projects', () => {
  test('[201] user can create new project', async () => {
    const res1 = await app
    .post(`${baseUrl}/users`)
    .set('Content-Type', 'application/json')
    .send(mockUsers.validInput3);
  let token = res1.body.body?.token;

    const res = await app
      .post(`${baseUrl}/projects`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(mockProjects.project1);
    expect(res.status).toBe(201);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toEqual(true);
  });

  test('[200] user can get all projects', async () => {
    const res = await app
      .get(`${baseUrl}/projects`)
      .set('Content-Type', 'application/json')
    expect(res.status).toBe(200);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toEqual(true);
  });
});
