'use strict';

import userModel from '../../../server/models/users.server.model.user';
import userSeed from '../../../server/models/users.server.model.user.seed';
import mongooseModule from 'modern-mean-core-material/dist/server/app/mongoose';
import aclModule from '../../../server/config/acl';

let sandbox;

describe('/modules/users/server/schemas/users.server.schema.email.js', () => {

  before(() => {
    return mongooseModule.connect()
      .then(Promise.all([aclModule.init(), userModel.init()]))
      .then(userSeed.seedUser);
  });

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });



  describe('presave', () => {
    let model, users;

    beforeEach(() => {
      model = userModel.getModels().user;
      return model
        .find()
        .then(result => {
          users = result;
        });
    });

    it('should set updated timestamp if modified', (done) => {
      let user = users[0];
      let timestamp = user.timestamps.updated;

      setTimeout(function () {
        user.emails[0].primary = !user.emails[0].primary;

        user.save()
          .then(result => {
            result.emails[0].timestamps.updated.toString().should.not.equal(timestamp.toString());
            return done();
          });
      }, 1001);

    });

    it('should not updated timestamp if not modified', (done) => {
      let user = users[0];
      let timestamp = user.timestamps.updated;

      setTimeout(function () {
        user.save()
          .then(result => {
            result.emails[0].timestamps.updated.toString().should.equal(timestamp.toString());
            return done();
          });

      }, 1001);

    });

  });

});
