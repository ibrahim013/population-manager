import chai from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import server from '../server/server';
import userData from './mockData';
import Keys from '../../config/keys';

dotenv.config();
const request = require('supertest');

const expect = chai.expect;

const db = Keys.mongo_URI_TEST;
describe('Population Management System ', () => {
  const { user } = userData;
  before((done) => {
    mongoose.createConnection(
      db,
      { useNewUrlParser: true }, () => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      },
    );
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
  it('should signup a new user', (done) => {
    request(server)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.staticUser)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.status).to.eql('success');
        done();
      });
  });
  it('should respond with an error message when input are not entered', (done) => {
    request(server)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.signUpErr)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should respond with an error message when using an already registered email', (done) => {
    request(server)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.existingEmail)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.email).to.eql('Email already exist');
        done();
      });
  });
  it('should be able to login successfuly', (done) => {
    request(server)
      .post('/api/v1/login')
      .set('Content-Type', 'application/json')
      .send(user.signIn)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.token).to.be.a('string');
        expect(res.body.status).to.be.eql('success');
        done();
      });
  });
  it('should respond with an error message if a wrong email or password is entered', (done) => {
    request(server)
      .post('/api/v1/login')
      .set('Content-Type', 'application/json')
      .send(user.incorrectCrendentials)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.msg).to.eql('email or password is Incorrect');
        expect(res.body.status).to.be.eql('fail');
        done();
      });
  });
});
