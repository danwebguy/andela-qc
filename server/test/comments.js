import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../../server';

chai.use(chaiHttp);
chai.should();
dotenv.config();

const token = process.env.tokenKey;

describe('/Post comments/:questionid', () => {
  it('Should create a question', (done) => {
    chai.request(server)
      .post('/api/v1/comments/1')
      .set('x-auth-token', token)
      .send({
        comment: 'Wow great master Jesus',
      })
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
