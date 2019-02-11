import chai from 'chai';
import server from '../server/server';


const request = require('supertest');

const expect = chai.expect;

describe('Random number generator', () => {
  let token;
  before((done) => {
    request(server)
      .get('/api/v1/token?admin=admin')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should respond with a 404', (done) => {
    request(server)
      .get('/dummy/path')
      .expect(404);
    done();
  });

  it('should respond with a welcome page', (done) => {
    request(server)
      .get('/')
      .expect(200);
    done();
  });

  it('should allow admin to get token', (done) => {
    request(server)
      .get('/api/v1/token?admin=admin')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(200);
        expect(res.body).to.have.a.property('success');
        expect(res.body).to.have.a.property('token');
        done();
      });
  });

  it('should return an error if no valid token is passed', (done) => {
    request(server)
      .get('/api/v1/numbers')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(403);
        expect(res.body).to.have.a.property('error');
        done();
      });
  });

  it('should return the number count if token is passed', (done) => {
    request(server)
      .get('/api/v1/numbers')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(200);
        expect(res.body).to.have.a.property('msg').to.equal('success');
        done();
      });
  });
  it('should return an error if no admin param is passed', (done) => {
    request(server)
      .get('/api/v1/token?admin=random')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(401);
        expect(res.body).to.have.a.property('error')
          .to.equal('Unauthorized user contact system administrator');
        done();
      });
  });

  it('should return an error if value inputed is > 2000', (done) => {
    request(server)
      .post('/api/v1/generate')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .send({ numGen: 3000 })
      .end((err, res) => {
        expect(400);
        expect(res.body).to.have.a.property('msg')
          .to.equal('you can not generate more than 2000 numbers at a go');
        done();
      });
  });

  it('should return an error if NAN is passed', (done) => {
    request(server)
      .post('/api/v1/generate')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .send({ numGen: 'TIA' })
      .end((err, res) => {
        expect(400);
        expect(res.body).to.have.a.property('msg')
          .to.equal('Only numbers are allowed here');
        done();
      });
  });

  it('should write to memory', (done) => {
    request(server)
      .post('/api/v1/generate')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .send({ numGen: 10 })
      .end((err, res) => {
        expect(201);
        expect(res.body).to.have.a.property('dataHold');
        done();
      });
  });
});
