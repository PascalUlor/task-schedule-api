import request from 'supertest';
import server from '../../api/server';
import mockUsers from '../../database/mock/user.mock';

const baseUrl = '/api';
const app = request(server);

describe('[POST]/users should create a new user', () => {
  test('should create a user and return 201 Created', async () => {
    const res = await app
      .post(`${baseUrl}/users`)
      .set('Content-Type', 'application/json')
      .send(mockUsers.validInput1);
    expect(res.status).toBe(201);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toEqual(true);
    expect(res.body.token);
  });

  test('should throw an error if any field is empty', async () => {
    const res = await app
      .post(`${baseUrl}/users`)
      .set('Content-Type', 'application/json')
      .send(mockUsers.emptyData);
    expect(res.statusCode).toBe(400);
    expect(res.body.check).toEqual({
      email: 'email field can not be blank',
      name: 'name field can not be blank',
      surname: 'surname field can not be blank',
    });
  });

  test('should throw an error if the email has already been used by another user', async () => {
    await app
      .post(`${baseUrl}/users`)
      .set('Content-Type', 'application/json')
      .send(mockUsers.validInput2);

    const res = await app
      .post(`${baseUrl}/users`)
      .set('Content-Type', 'application/json')
      .send(mockUsers.existingUser);
    expect(res.statusCode).toBe(409);
    expect(res.body.success).toEqual(false);
    expect(res.body.message).toEqual(
      'User with email flash@yahoo.com already exist',
    );
  });
});
