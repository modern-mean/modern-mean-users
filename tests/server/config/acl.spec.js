'use strict';

import * as aclModule from '../../../server/config/acl';
import mongooseModule from 'modern-mean-core-material/dist/server/app/mongoose';

let sandbox;

describe('/modules/users/server/config/acl.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return aclModule.default.should.be.an('object');
    });

    it('should export init', () => {
      return aclModule.init.should.be.a('function');
    });

    it('should export get', () => {
      return aclModule.get.should.be.a('function');
    });

    it('should export destroy', () => {
      return aclModule.destroy.should.be.a('function');
    });

  });

});
