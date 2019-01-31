import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../../server';

chai.use(chaiHttp);
chai.should();
dotenv.config();

const token = process.env.tokenKey;

describe('test meetups endpoint', () => {
  it('it should get all the meetups', (done) => {
    chai.request(server)
      .get('/api/v1/meetups')
      .set('x-auth-token', token)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should create meet up', (done) => {
    chai.request(server)
      .post('/api/v1/meetups')
      .set('x-auth-token', token)
      .send({
        topic: 'Meetup Lagos',
        location: 'Lagos',
        happeningOn: '2019-07-01 15:00:00',
        tags: [],
      })
      .end((err, res) => {
        res.status.should.be.equal(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should fail without topic field', (done) => {
    chai.request(server)
      .post('/api/v1/meetups')
      .set('x-auth-token', token)
      .send({
        location: 'Lagos',
        happeningOn: '2019-07-01 15:00:00',
        tags: [],
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.be.a('object');
        res.body.topic.should.have.eql('topic field is required');
        done();
      });
  });
  it('it should fail without location field', (done) => {
    chai.request(server)
      .post('/api/v1/meetups')
      .set('x-auth-token', token)
      .send({
        topic: 'Meetup Lagos',
        happeningOn: '2019-07-01 15:00:00',
        tags: [],
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.be.a('object');
        res.body.location.should.have.eql('location field is required');
        done();
      });
  });
  it('it should fail without happeningOn field', (done) => {
    chai.request(server)
      .post('/api/v1/meetups')
      .set('x-auth-token', token)
      .send({
        location: 'Lagos',
        topic: 'Meetup Lagos',
        tags: [],
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.be.a('object');
        res.body.happeningOn.should.have.eql('happeningOn field is required');
        done();
      });
  });
  it('it should get upcoming all the meetups', (done) => {
    chai.request(server)
      .get('/api/v1/meetups/upcoming')
      .set('x-auth-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should get meetup by ID', (done) => {
    chai.request(server)
      .get('/api/v1/meetups/1')
      .set('x-auth-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should fail with a wrong ID', (done) => {
    chai.request(server)
      .get('/api/v1/meetups/0')
      .set('x-auth-token', token)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should create tags for meetup', (done) => {
    chai.request(server)
      .post('/api/v1/meetups/1/tags')
      .set('x-auth-token', token)
      .send({
        tags: 'Andela, Meetups',
      })
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
