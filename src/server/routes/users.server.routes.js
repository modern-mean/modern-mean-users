'use strict';

import passport from 'passport';
import express from 'express';
import logger from '../config/logger';
import multer from 'multer';
import { profile, password, authorization } from '../controllers/users.server.controller';
import profileUpload from '../config/profileUpload';
import { config } from '../config/config';

function init(app) {
  return new Promise((resolve, reject) => {
    logger.debug('Users::Routes::Start');
    let router = express.Router();

    let upload = multer({
      storage: profileUpload.storage(),
      fileFilter: profileUpload.filter
    });

    //Set JWT Auth for all user Routes
    router.all('*', passport.authenticate('jwt', { session: false }));

    // Setting up the users profile api
    router.route('/')
      .get(profile.me)
      .put(profile.update);

    //TODO  renable when social accounts are working again.
    //router.route('/accounts').delete(controllers.authentication.removeOAuthProvider);
    router.route('/addresses').put(profile.addresses);
    router.route('/authorization').get(authorization.read);
    router.route('/emails').put(profile.emails);
    router.route('/password').post(password.changePassword);
    router.route('/picture').post(upload.single('newProfilePicture'), profile.changeProfilePicture);

    app.use(config.modules.users.api.endpoints.me, router);
    logger.verbose('Users::Routes::Success');
    return resolve(app);
  });
}

let service = { init: init };

export default service;
export { init };
