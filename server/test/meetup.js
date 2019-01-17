// Testing get all meetup endpoints
import request from 'supertest';
import { expect } from 'chai';
import server from '../../server';
import auth from '../helpers/auth';

const userCredentials = {
  "email": "danielufeli@yahoo.com",
  "password": "$2a$10$3SYL/3C6r8qpA14BLgmj9.ZsPkYhMAd.5nvqGCVWh3RKsqVta8/Dm"
};
// now let's login the user before we run any tests
const authenticatedUser = request.agent(server);
before((done) => {
  authenticatedUser
    .post('/api/v1/auth/login')
    .send(userCredentials)
    .set('x-auth-token', auth.verifyToken)
    .end((err, response) => {
      expect(response.statusCode).to.equal(200);
      expect('Location', '/');
      done();
    });
});

describe('Meetups Api Exists', () => {
  describe('GET /meetups', () => {
    it('should return status code 200 when successful', (done) => {
      request(server)
        .get('/api/v1/meetups')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('GET /meetups/upcoming', () => {
    it('should return status code 200 when upcoming meetups is loaded', (done) => {
      request(server)
        .get('/api/v1/meetups/upcoming')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('GET /meetups/:id', () => {
    it('should return status code 200 when id is valid', (done) => {
      request(server)
        .get('/api/v1/meetups/25')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should return status code 404 when id is invalid', (done) => {
      request(server)
        .get('/api/v1/meetups/0')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });

  describe('POST /meetups', () => {
    let data;

    it('should return status code 201 when meetup is successfully created', (done) => {
      data = {
        topic: 'Tech Connect',
        location: 'Lagos',
        image: 'image.jpg',
        happeningOn: '2019-01-20',
        tags: 'Developers',
      };
      authenticatedUser.post('/api/v1/meetups')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });

    it('should fail when location field is not filled', (done) => {
      data = {
        topic: 'Tech Connect',
        happeningOn: '2019-01-20',
        tags: 'Developers',
      };
      authenticatedUser.post('/api/v1/meetups')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should fail when topic field is not filled', (done) => {
      data = {
        location: 'Lagos',
        happeningOn: '2019-01-20',
        tags: 'Developers',
      };
      request(server)
      authenticatedUser.post('/api/v1/meetups')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should fail when happeningOn field is not filled', (done) => {
      data = {
        topic: 'Tech Connect',
        location: 'Lagos',
        tags: 'Developers',
      };
      authenticatedUser.post('/api/v1/meetups')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
    it('should fail when nothing is submitted', (done) => {
      data = {};
      authenticatedUser.post('/api/v1/meetups')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
});
