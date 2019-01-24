import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDgyMjIzMDJ9.jeI-rw4tS4lbj7m1PzXLf0i75D6CwRTmmq_ExiArOhY';

describe('/GET meetups', () => {
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
});

describe('/Post meetup', () => {
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
});
describe('/GET upcoming meetups', () => {
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
});
