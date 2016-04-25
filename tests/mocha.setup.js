import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import request from 'supertest';
import logger from '../server/config/logger';
import * as config from '../server/config/config';

chai.use(promised);
chai.use(sinonChai);

global.expect = chai.expect;
global.should = chai.should();
global.sinon = sinon;
global.request = request;
global.config = config;
