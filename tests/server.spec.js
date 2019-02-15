import chai from 'chai';
import chaiHTTP from 'chai-http';

import server from '../src';
import { baseUrl } from './testData';
import constants from '../src/configuration/constants';

const should = chai.should();
chai.use(chaiHTTP);

// Tests the entrypoint of the server

describe('/GET server', () => {
  it("it should return an object with property message:'welcome'", done => {
    const exp = { msg: 'welcome' };
    chai
      .request(server)
      .get(constants.baseUrl)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql(exp.msg, `expected message property to be '${exp.msg}'`);
        done();
      });
  });
});
