import request from 'supertest';
import server from '../../api/server';
import mockUsers from '../../database/mock/user.mock';

const baseUrl = '/api';
const app = request(server);

describe('[POST] and  [GET] /users', () => {
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

  test('[400] should throw an error if any field is empty return', async () => {
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

  test('[409] should throw an error if the email has already been used by another user', async () => {
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

  test('[200] user can [GET] all users', async (done) => {
    const res = await app
      .get(`${baseUrl}/users`)
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Users fetched successfully');
    done();
  });

  test('[200] user can [GET] users by name', async (done) => {
    const res = await app
      .get(`${baseUrl}/users?name=${mockUsers.validInput2.name}`)
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Search by user name successfully');
    done();
  });

  test('user can [GET] users by surname', async (done) => {
    const res = await app
      .get(`${baseUrl}/users?surname=${mockUsers.validInput2.surname}`)
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Search by surname successfully');
    done();
  });

  test('[400] Failed [GET] users if name does not exist', async (done) => {
    const res = await app
      .get(`${baseUrl}/users?name=dummy`)
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual('Search by user name Failed');
    done();
  });

  test('[400] Failed [GET] users if surname does not exist', async (done) => {
    const res = await app
      .get(`${baseUrl}/users?surname=dummy`)
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual('Search by surname Failed');
    done();
  });
});
