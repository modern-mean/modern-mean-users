'use strict';

import logger from './config/logger';
import userModel from './models/users.server.model.user';
import userSeed from './models/users.server.model.user.seed';
import userRoutes from './routes/users.server.routes';
import authRoutes from './routes/auth.server.routes';
import imageRoutes from './routes/image.server.routes';
import authentication from './authentication/authentication';
import { config } from './config/config';
import aclModule from './config/acl';


function init(app) {
  logger.debug('Users::Init::Start');

  let modelInit = new Promise(function (resolve, reject) {
    logger.debug('Users::Init::Model::Start');
    userModel
      .init()
      .then(function (model) {
        if (config.mongoose.seed === 'true') {
          userSeed.init();
        }
        logger.verbose('Users::Init::Model::Success');
        return resolve();
      })
      .catch(function (err) {
        logger.error('Users::Init::Model::Error::' + err);
        return reject(err);
      });
  });


  let expressInit = new Promise(function (resolve, reject) {
    logger.debug('Users::Init::Express::Start');
    authentication.init(app)
      .then(userRoutes.init)
      .then(authRoutes.init)
      .then(imageRoutes.init)
      .then(function () {
        logger.verbose('Users::Init::Express::Success');
        return resolve(app);
      })
      .catch(function (err) {
        logger.error('Users::Init::Express::Error::' + err);
        return reject(err);
      });
  });

  return Promise.all([modelInit, expressInit]);
}

let service = { init: init };

export default service;
export { init };
