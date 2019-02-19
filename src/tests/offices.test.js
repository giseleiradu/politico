import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
  expect,
} = chai;

chai.use(chaiHttp);

/* Offices */
describe('Offices', () => {
  describe('POST /api/v1/offices', () => {
    // test 2
    it('should return a created office', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .send({
          name: 'President',
          type: 'Presidential',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.length).to.be.above(0);
          done();
        });
    });
  });
  describe('GET /api/v1/offices', () => {
    // test 2
    it('should return a list of offices', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.above(0);
          done();
        });
    });
  });
});
describe('GET /api/v1/offices/:id', () => {
  // test 3
  it('should return an office', (done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.be.above(0);
        done();
      });
  });
});
