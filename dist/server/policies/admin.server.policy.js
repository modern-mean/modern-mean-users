'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.policy = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _acl = require('../config/acl');

var _acl2 = _interopRequireDefault(_acl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function policy() {
  return new Promise((resolve, reject) => {
    _winston2.default.debug('Users::Policy::Admin::Start');
    _acl2.default.getAcl().allow([{
      roles: ['admin'],
      allows: [{
        resources: '/api/users',
        permissions: '*'
      }]
    }]).then(() => {
      _winston2.default.verbose('Users::Routes::Admin::Success');
      return resolve();
    }).catch(err => {
      _winston2.default.error(err);
      return reject(err.message);
    });
  });
}

let adminPolicy = { policy: policy };

exports.policy = policy;
exports.default = adminPolicy;