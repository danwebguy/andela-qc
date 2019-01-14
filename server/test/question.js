import request from 'supertest';
import { expect } from 'chai';
import server from '../../server';

// Testing get all question endpoints

describe('Question Api Exists', () => {
  describe('GET /questions', () => {
    it('should return status code 200 when successful', (done) => {
      request(server)
        .get('/api/v1/questions')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
  describe('POST /questions', () => {
    let data;
    it('should return status code 201 when question is successfully sent', (done) => {
      data = {
        title: 'Danny Question',
        body: 'What is it all about',
      };
      request(server)
        .post('/api/v1/questions')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });

    it('should return 400 when body field is not filled', (done) => {
      data = {
        title: 'Danny Question',
      };
      request(server)
        .post('/api/v1/questions')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should return 400 when title field is not filled', (done) => {
      data = {
        body: 'What is it all about',
      };
      request(server)
        .post('/api/v1/questions')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should fail when nothing is submitted', (done) => {
      data = {};
      request(server)
        .post('/api/v1/questions')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });

  describe('PATCH /questions/question_id/upvote', () => {
    it('should return status code 200 upvote with valid id', (done) => {
      request(server)
        .patch('/api/v1/questions/1/upvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('PATCH /questions/question_id/downvote', () => {
    it('should return status code 200 for downvote with valid id', (done) => {
      request(server)
        .patch('/api/v1/questions/1/downvote')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
});
