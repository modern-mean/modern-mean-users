'use strict';

import logger from './config/logger';
import adminRoutes from './routes/admin.server.routes';
import adminPolicy from './policies/admin.server.policy';
import aclModule from './config/acl';

function init(app) {
  return new Promise(function(resolve, reject) {
    logger.debug('UsersAdmin::Init::Start');
    
    adminPolicy.policy()
      .then(() => {
        adminRoutes.init(app)
          .then(() => {
            logger.verbose('UsersAdmin::Routes::Success');
            return resolve(app);
          })
          .catch(err => {
            logger.error(err);
            return reject(err);
          });
      })
      .catch(err => {
        logger.error(err);
        return reject(err);
      });


  });
}

let service = { init: init };

export default service;
export { init };
