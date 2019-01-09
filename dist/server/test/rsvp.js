'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('RSVP Api Exists', function () {
  describe('POST /meetups/:meetup-id/rsvps', function () {
    var payload = { status: 'yes' };
    it('should return status code 201 on successful', function (done) {
      (0, _supertest2.default)(_server2.default).post('/api/v1/meetups/1/rsvps').send(payload).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(201);
        done();
      });
    });

    it('should return 400 status code when empty payload is submitted', function (done) {
      payload = {};
      (0, _supertest2.default)(_server2.default).post('/api/v1/meetups/1/rsvps').send(payload).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should return 404 status with invalid meetupId', function (done) {
      (0, _supertest2.default)(_server2.default).post('/api/v1/meetups/invalidId/rsvps').send(payload).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(404);
        done();
      });
    });
  });
});