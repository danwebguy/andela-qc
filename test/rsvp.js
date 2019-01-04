const request = require('supertest');
const { expect } = require('chai');
const server = require('../server');

describe('RSVP Api Exists', () => {
  describe('POST /meetups/:meetup-id/rsvps', () => {
    let payload = { status: 'yes' };
    it('should return status code 201 on successful', (done) => {
      request(server)
        .post('/api/v1/meetups/1/rsvps')
        .send(payload)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });

    it('should return 400 status code when empty payload is submitted', (done) => {
      payload = {};
      request(server)
        .post('/api/v1/meetups/1/rsvps')
        .send(payload)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should return 404 status with invalid meetupId', (done) => {
      request(server)
        .post('/api/v1/meetups/invalidId/rsvps')
        .send(payload)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
});
