'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Testing get all meetup endpoints

describe('Meetups Api Exists', function () {
  describe('GET /meetups', function () {
    it('should return status code 200 when successful', function (done) {
      (0, _supertest2.default)(_server2.default).get('/api/v1/meetups').end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /meetups/upcoming', function () {
    it('should return status code 200 when upcoming meetups is loaded', function (done) {
      (0, _supertest2.default)(_server2.default).get('/api/v1/meetups/upcoming').end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /meetups/:id', function () {
    it('should return status code 200 when id is valid', function (done) {
      (0, _supertest2.default)(_server2.default).get('/api/v1/meetups/1').end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should return status code 404 when id is invalid', function (done) {
      (0, _supertest2.default)(_server2.default).get('/api/v1/meetups/none').end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('POST /meetups', function () {
    var data = void 0;

    it('should return status code 201 when meetup is successfully created', function (done) {
      data = {
        topic: 'Tech Connect',
        location: 'Lagos',
        image: 'image.jpg',
        happeningOn: '2019-01-20',
        tags: 'Developers'
      };
      (0, _supertest2.default)(_server2.default).post('/api/v1/meetups').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(201);
        done();
      });
    });

    it('should fail when location field is not filled', function (done) {
      data = {
        topic: 'Tech Connect',
        happeningOn: '2019-01-20',
        tags: 'Developers'
      };
      (0, _supertest2.default)(_server2.default).post('/api/v1/meetups').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should fail when topic field is not filled', function (done) {
      data = {
        location: 'Lagos',
        happeningOn: '2019-01-20',
        tags: 'Developers'
      };
      (0, _supertest2.default)(_server2.default).post('/api/v1/meetups').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should fail when happeningOn field is not filled', function (done) {
      data = {
        topic: 'Tech Connect',
        location: 'Lagos',
        tags: 'Developers'
      };
      (0, _supertest2.default)(_server2.default).post('/api/v1/meetups').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should fail when tags field is not filled', function (done) {
      data = {
        topic: 'Tech Connect',
        location: 'Lagos',
        happeningOn: '2019-01-20'
      };
      (0, _supertest2.default)(_server2.default).post('/api/v1/meetups').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should fail when nothing is submitted', function (done) {
      data = {};
      (0, _supertest2.default)(_server2.default).post('/api/v1/meetups').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(400);
        done();
      });
    });
  });
});