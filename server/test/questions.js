import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../../server';

chai.use(chaiHttp);
chai.should();
dotenv.config();

const token = process.env.tokenKey;

describe('Test question endpoints', () => {
  it('it should get all the questions', (done) => {
    chai.request(server)
      .get('/api/v1/questions')
      .set('x-auth-token', token)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should create a question', (done) => {
    chai.request(server)
      .post('/api/v1/questions/1')
      .set('x-auth-token', token)
      .send({
        title: 'Why am I fat',
        body: 'I am not sure why I am fat',
      })
      .end((err, res) => {
        res.status.should.be.equal(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should fail without title field', (done) => {
    chai.request(server)
      .post('/api/v1/questions/1')
      .set('x-auth-token', token)
      .send({
        body: 'I am not sure why I am fat',
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.be.a('object');
        res.body.title.should.have.eql('title field is required');
        done();
      });
  });
  it('Should fail without body field', (done) => {
    chai.request(server)
      .post('/api/v1/questions/1')
      .set('x-auth-token', token)
      .send({
        title: 'Why am I fat',
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.be.a('object');
        res.body.body.should.have.eql('body field is required');
        done();
      });
  });
  it('it should upvote a question', (done) => {
    chai.request(server)
      .patch('/api/v1/questions/1/upvote')
      .set('x-auth-token', token)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should downvote a question', (done) => {
    chai.request(server)
      .patch('/api/v1/questions/1/downvote')
      .set('x-auth-token', token)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
