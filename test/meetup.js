const request = require('supertest');
const { expect } = require('chai');
const server = require('../server');

// Testing get all meetup endpoints

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
        .get('/api/v1/meetups/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should return status code 404 when id is invalid', (done) => {
      request(server)
        .get('/api/v1/meetups/none')
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
      request(server)
        .post('/api/v1/meetups')
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
      request(server)
        .post('/api/v1/meetups')
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
        .post('/api/v1/meetups')
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
      request(server)
        .post('/api/v1/meetups')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should fail when tags field is not filled', (done) => {
      data = {
        topic: 'Tech Connect',
        location: 'Lagos',
        happeningOn: '2019-01-20',
      };
      request(server)
        .post('/api/v1/meetups')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should fail when nothing is submitted', (done) => {
      data = {};
      request(server)
        .post('/api/v1/meetups')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
});
