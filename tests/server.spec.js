import chai from 'chai';
import chaiHTTP from 'chai-http';

import server from '../src';
import { baseUrl } from './testData';

const should = chai.should();
chai.use(chaiHTTP);
