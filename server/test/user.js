// Testing get all meetup endpoints
import { expect } from 'chai';
import request from 'supertest';
import server from '../../server';

const userCredentials = {
  "email": "onjane@yahoo.com",
  "password": "Glory20"
};
// now let's login the user before we run any tests
const authenticatedUser = request.agent(server);
before((done) => {
  authenticatedUser
    .post('/api/v1/auth/login')
    .send(userCredentials)
    .end((err, response) => {
      expect(response.statusCode).to.equal(200);
      expect('Location', '/');
      done();
    });
});

describe('GET /meetups', (done) => {
  // addresses 1st bullet point: if the user is logged in we should get a 200 status code
  it('should return a 200 response if the user is logged in', (done) => {
    authenticatedUser.get('/api/v1/meetups')
      .expect(200, done);
  });
// addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
  it('should return a 302 response and redirect to /login', (done) => {
    request(server).get('/api/v1/meetups')
      .expect('Location', '/api/v1/auth/login')
      .expect(400, done);
  });
});
