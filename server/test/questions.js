import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDgyMjIzMDJ9.jeI-rw4tS4lbj7m1PzXLf0i75D6CwRTmmq_ExiArOhY';

describe('/GET questions', () => {
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
});
describe('/Post questions/:meetupid', () => {
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
});
describe('/PATCH questions/:id/upvote', () => {
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
});
describe('/PATCH questions/:id/downvote', () => {
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
