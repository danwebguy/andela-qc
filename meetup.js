import request from 'supertest';
import { expect } from 'chai';
import server from '../../server';

// Testing get all meetup endpoints

describe('Meetups', () => {
  describe('GET /meetups', () => {
    it('should return status code 200 on successful fetching of all meetups', (done) => {
      request(server)
        .get('/api/v1/meetups')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data[0])
            .to.have.keys('id', 'topic', 'location', 'happeningon', 'createdon', 'tags');
          expect(res.body.data[0].topic).to.equal('coders brings live');
          expect(res.body.data[0].location).to.equal('Abuja');
          expect(res.body.data[0].happeningOn).to.equal('12-04-2016');
          expect(res.body.data[0].tags).to.deep.equal(['codes', 'live']);
          done();
        });
    });
  });
});
