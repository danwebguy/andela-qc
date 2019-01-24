import 'babel-polyfill';
import request from 'supertest';
import { expect } from 'chai';
import server from '../../server';

const user = {
  firstname: 'James',
  lastname: 'Olaorede',
  username: 'ojames',
  othername: 'Gideon',
  phonenumber: '08084405956',
  email: 'james12345@yahoo.com',
  password: '$2a$10$MjDd29.fW5U2/FlO.irBN.I68xQn6YDNO2mS4X6xbqaR0AxlYkkWa',
};

describe('POST /auth/signup', () => {
  it('should respond with status 201', async () => {
    try {
      const res = await request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .expect(201);
      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toEqual('Registration was successfull');
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 409 and message email already exists', async () => {
    try {
      const res = await request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .expect(400);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ status: 400, error: 'User already exists' });
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 409 and message username already exists', async () => {
    try {
      const res = await request(server)
        .post('/api/v1/auth/signup')
        .send({ email: 'test1@gmail.com', username: 'test', password: 'test' })
        .expect(409);
      expect(res.statusCode).toEqual(409);
      expect(res.body).toEqual({ status: 409, error: 'User already exists' });
    } catch (error) {
      console.log(error);
    }
  });
});
describe('POST /auth/login', () => {
  // Test for user login
  it('should respond with 200', async () => {
    try {
      const res = await request(server)
        .post('/api/v1/auth/login')
        .send({ username: 'test@gmail.com', password: 'test' })
        .expect(200);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data[0].message).toEqual('Login was successful');
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 404 and error There is no user with this credentials', async () => {
    try {
      const res = await request(server)
        .post('/api/v1/auth/login')
        .send({ username: 'feesrfh@yahoo.com', password: 'yrvbiykjbnuikjh' })
        .expect(404);
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toEqual('Invalid username or password');
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 401 and error Invalid username or password', async () => {
    try {
      const res = await request(server)
        .post('/api/v1/auth/login')
        .send({ username: 'test@gmail.com', password: 'yrvbiykjbnuikjh' })
        .expect(401);
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual('Invalid username or password');
    } catch (error) {
      console.log(error);
    }
  });
});