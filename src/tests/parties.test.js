import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../database/db';
import app from '../app';

const {
  expect,
} = chai;
let token = ''; // token to pass in the header

chai.use(chaiHttp);
/* Parties */
describe('Parties', () => {
  // clear parties table
  before(async () => {
    try {
      await db.query('TRUNCATE parties CASCADE; ALTER SEQUENCE parties_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });
  // login first to get a token
  describe('POST /api/v1/auth/login', () => {
    it('should return the user information if the account exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johnsmith@gmail.com',
          password: '12345',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          token = res.body.token;
          done();
        });
    });
  });
  describe('POST /api/v1/parties', () => {
    // test 1
    it('should return a created party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('access-token', token) // pass the token
        .send({
          name: 'RPF',
          hqAddress: 'Kigali',
          logoUrl: 'logo',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.length).to.be.above(0);
          console.log(res.body.data);
          done();
        });
    });
  });
  describe('GET /api/v1/parties', () => {
    // test 1
    it('should return a list of parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .set('access-token', token) // pass the token
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.above(0);
          done();
        });
    });
  });
  describe('GET /api/v1/parties/:id', () => {
    // test 1
    it('should return a party', (done) => {
      chai.request(app)
        .get('/api/v1/parties/1')
        .set('access-token', token) // pass the token
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.above(0);
          done();
        });
    });
  });
  // describe('PATCH /api/v1/parties/:id/name', () => {
  //   it('should update the name of a party', (done) => {
  //     chai.request(app)
  //       .patch('/api/v1/parties/1/name')
  //       .set('access-token', token) // pass the token
  //       .send({
  //         name: 'PL',
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(res.body.data.length).to.be.above(0);
  //         done();
  //       });
  //   });
  // });
  describe('DELETE /api/v1/parties/:id', () => {
    // test 1
    it('should return the deleted party', (done) => {
      chai.request(app)
        .delete('/api/v1/parties/1')
        .set('access-token', token) // pass the token
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message.toLowerCase()).to.equal('party deleted');
          done();
        });
    });
  });
});
