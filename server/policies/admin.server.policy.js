'use strict';

import logger from '../config/logger';
import aclModule from '../config/acl';

function policy() {
  return new Promise((resolve, reject) => {
    logger.debug('Users::Policy::Admin::Start');
    aclModule
      .get()
      .allow([{
        roles: ['admin'],
        allows: [{
          resources: '/api/users',
          permissions: '*'
        }]
      }])
      .then(() => {
        logger.verbose('Users::Routes::Admin::Success');
        return resolve();
      })
      .catch(err => {
        logger.error(err);
        return reject(err.message);
      });
  });
}

let adminPolicy = { policy: policy };

export { policy };
export default adminPolicy;
