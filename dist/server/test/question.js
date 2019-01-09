'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Testing get all question endpoints

describe('Question Api Exists', function () {
  describe('POST /questions', function () {
    var data = void 0;
    it('should return status code 201 when question is successfully sent', function (done) {
      data = {
        title: 'Danny Question',
        body: 'What is it all about'
      };
      (0, _supertest2.default)(_server2.default).post('/api/v1/questions').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(201);
        done();
      });
    });

    it('should return 400 when body field is not filled', function (done) {
      data = {
        title: 'Danny Question'
      };
      (0, _supertest2.default)(_server2.default).post('/api/v1/questions').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should return 400 when title field is not filled', function (done) {
      data = {
        body: 'What is it all about'
      };
      (0, _supertest2.default)(_server2.default).post('/api/v1/questions').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should fail when nothing is submitted', function (done) {
      data = {};
      (0, _supertest2.default)(_server2.default).post('/api/v1/questions').send(data).end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('PATCH /questions/question_id/upvote', function () {
    it('should return status code 200 upvote with valid id', function (done) {
      (0, _supertest2.default)(_server2.default).patch('/api/v1/questions/1/upvote').end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('PATCH /questions/question_id/downvote', function () {
    it('should return status code 200 for downvote with valid id', function (done) {
      (0, _supertest2.default)(_server2.default).patch('/api/v1/questions/1/downvote').end(function (err, res) {
        (0, _chai.expect)(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});