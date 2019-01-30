import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDgyMjIzMDJ9.jeI-rw4tS4lbj7m1PzXLf0i75D6CwRTmmq_ExiArOhY';

describe('/Post/meetups/:id/rsvps', () => {
  it('Should create rsvps', (done) => {
    chai.request(server)
      .post('/api/v1/meetups/1/rsvps')
      .set('x-auth-token', token)
      .send({
        response: 'yes',
      })
      .end((err, res) => {
        res.status.should.be.equal(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should fail without response field', (done) => {
    chai.request(server)
      .post('/api/v1/meetups/1/rsvps')
      .set('x-auth-token', token)
      .send({
        response: '',
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.be.a('object');
        res.body.response.should.have.eql('response is required');
        done();
      });
  });
});
