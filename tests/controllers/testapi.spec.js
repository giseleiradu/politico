// tests down here
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src';
import {dummyParties1, dummyParties2, dummyOffices, dummyOffice} from '../testData';

const should = chai.should();

chai.use(chaiHttp);

describe('GET /parties', () => {
  it('should get all the parties', done => {
    chai
      .request(server)
      .get('/api/v1/parties')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');

        done();
      });
  });
});

describe(`GET /api/v1/parties/id`, () => {
  it('should get a specific partie ', done => {
    chai
      .request(server)
      .get(`/api/v1/parties/${dummyParties2.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should not get the party ', () => {
      chai
        .request(server)
        .get('/api/v1/parties/3')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          // res.body.should.have.property(
          //   // [],
          //   // 'invalid id',
          //   // 'the id should be a number and be existing in database',
          // );
        });
    });
  });

  describe('POST parties', () => {
    it('it should return a valid object', done => {
      chai
        .request(server)
        .post('/api/v1/parties/')
        .send(dummyParties1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('name').be.a('string', 'Expected id to be a string');
          res.body.should.have.property('hqAddress');
          res.body.hqAddress.should.be.a(
            'string',
            'Expected the hqAddress to be a string',
          );
          res.body.should.have.property('logoUrl').be.a('string', 'Expected the logo URL to be a string');
          done();
        });
    });
  });

  describe('POST offices', () => {
    it('it should return a valid object', done => {
      chai
        .request(server)
        .post('/api/v1/offices/')
        .send(dummyOffice)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('name').be.a('string', 'Expected id to be a string');
          res.body.should.have.property('type');
          res.body.type.should.be.a('string','Expected the type to be a string');
          done();
        });
    });
  });

  describe('GET /offices', () => {
    it('should get all the offices', done => {
      chai
        .request(server)
        .get('/api/v1/offices')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');

          done();
        });
    });
  });

  describe(`GET /api/v1/offices/id`, () => {
    it('should get a specific office ', done => {
      chai
        .request(server)
        .get(`/api/v1/offices/${dummyOffice.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe(`GET /api/v1/parties/id`, () => {
    it('should get a specific partie ', done => {
      chai
        .request(server)
        .delete(`/api/v1/parties/${dummyParties2.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
