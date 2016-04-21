'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strategy = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _usersServerModel = require('../../models/users.server.model.user');

var _usersServerModel2 = _interopRequireDefault(_usersServerModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let LocalStrategy = require('passport-local').Strategy;

function strategy() {
  return new Promise(function (resolve, reject) {
    _winston2.default.debug('Users::Authentication::Local::Start');
    // Use local strategy
    _passport2.default.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function (email, password, done) {
      let User = _usersServerModel2.default.getModels().user;
      User.findOne({ 'providers.type': 'local', 'providers.email': email.toLowerCase() }).then(user => {
        if (!user) {
          return done('Invalid email or password', false);
        }

        let localProvider = _lodash2.default.find(user.providers, { type: 'local' });

        if (!localProvider || !localProvider.authenticate(password)) {
          return done('Invalid email or password', false);
        }

        return done(null, user);
      }).catch(err => {
        return done(err, false);
      });
    }));
    _winston2.default.verbose('Users::Authentication::Local::Success');
    return resolve();
  });
}

let service = { strategy: strategy };

exports.default = service;
exports.strategy = strategy;