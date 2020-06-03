import request from 'supertest';
import server from '../../api/server';
import mockProjects from '../../database/mock/projects.mock';
import mockUsers from '../../database/mock/user.mock';
import mockTask from '../../database/mock/task.mock';

const baseUrl = '/api';
const app = request(server);


describe('[POST] and  [GET] /tasks', () => {
    test('[201] user can create new task', async () => {
    const res1 = await app
    .post(`${baseUrl}/users`)
    .set('Content-Type', 'application/json')
    .send(mockUsers.validInput5);
  let token = res1.body.body?.token;

    await app
      .post(`${baseUrl}/projects`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(mockProjects.project2);

      const res = await app
        .post(`${baseUrl}/tasks`)
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(mockTask.task1);
      expect(res.status).toBe(201);
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toEqual(true);
    });
  
    test('[200] user can get all tasks', async () => {
      const res1 = await app
    .post(`${baseUrl}/users`)
    .set('Content-Type', 'application/json')
    .send(mockUsers.validInput4);
  let token = res1.body.body?.token;

    await app
      .post(`${baseUrl}/projects`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(mockProjects.project3);

      await app
        .post(`${baseUrl}/tasks`)
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(mockTask.task2);

      const res = await app
        .get(`${baseUrl}/tasks`)
        .set('Content-Type', 'application/json')
      expect(res.status).toBe(200);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toEqual(true);
    });
  });
  