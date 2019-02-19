import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
  expect,
} = chai;

chai.use(chaiHttp);
/* Parties */
describe('Parties', () => {
  describe('POST /api/v1/parties', () => {
    // test 1
    it('should return a created party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send({
          name: 'RPF',
          hqAddress: 'Kigali',
          logoUrl: 'logo',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.length).to.be.above(0);
          done();
        });
    });
  });
  describe('GET /api/v1/parties', () => {
    // test 1
    it('should return a list of parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
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
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.above(0);
          done();
        });
    });
  });
  describe('PATCH /api/v1/parties/:id/:name', ()=>{
    it('should update the name of a party', (done)=>{
      chai.request(app)
      .patch('api/v1/parties/1/PL')
      .end(err, res)=>{
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.be.above(0);
        done();
      });
    });
  });
  describe('DELETE /api/v1/parties/:id', () => {
    // test 1
    it('should return the deleted party', (done) => {
      chai.request(app)
        .delete('/api/v1/parties/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.above(0);
          done();
        });
    });
  });
});
