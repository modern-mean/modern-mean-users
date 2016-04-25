import nodeacl from 'acl';
import logger from './logger';
import mongooseModule from 'modern-mean-core-material/dist/server/app/mongoose';

let acl;

function init() {
  return new Promise((resolve, reject) => {
    logger.debug('User::Acl::Init::Start');

    mongooseModule
      .connect()
      .then(db => {
        acl = new nodeacl(new nodeacl.mongodbBackend(db.connection.db, 'acl_'));
        logger.verbose('User::Acl::Init::Success');
        return resolve(acl);
      });

  });
}

function get() {
  return acl;
}

function destroy() {
  acl = undefined;
}

if (acl === undefined) {
  init();
}

let service = { init: init, get: get, destroy: destroy };

export default service;
export { init, get, destroy };
