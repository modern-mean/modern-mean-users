'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let config;

function load() {
  return exports.config = config = {
    logs: {
      //https://github.com/winstonjs/winston
      winston: {
        level: process.env.MEAN_USERS_WINSTON_LEVEL || process.env.MEAN_WINSTON_LEVEL || 'info', //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
        file: process.env.MEAN_USERS_WINSTON_FILE || process.env.MEAN_WINSTON_FILE || './logs/users.log',
        console: process.env.MEAN_USERS_WINSTON_CONSOLE || process.env.MEAN_WINSTON_CONSOLE || 'true'
      }
    },
    mongoose: {
      seed: process.env.MEAN_USERS_SEED || 'false'
    },
    uploads: {
      profile: {
        destination: process.env.MEAN_USERS_PROFILE_UPLOAD || './public/img/profile/uploads/',
        public: process.env.MEAN_USERS_PROFILE_PUBLIC || '/img/profile/uploads/',
        limits: {
          fileSize: process.env.MEAN_USERS_PROFILE_SIZE || '1045876' // Max file size in bytes (1 MB)
        }
      }
    },
    jwt: {
      secret: process.env.MEAN_USERS_JWT_SECRET || 'MODERN!MEAN!t0p$3cr37!t0k3n',
      options: { //Anything From https://www.npmjs.com/package/jsonwebtoken
        expiresIn: process.env.MEAN_USERS_JWT_EXPIRES || '1d'
      }
    }
  };
}

load();

exports.load = load;
exports.config = config;