'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAcl = exports.init = undefined;

var _acl = require('acl');

var _acl2 = _interopRequireDefault(_acl);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _mongoose = require('../../../core/server/app/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let acl;

function init() {
  return new Promise((resolve, reject) => {
    _winston2.default.debug('User::Acl::Init::Start');

    _mongoose2.default.connect().then(db => {
      acl = new _acl2.default(new _acl2.default.mongodbBackend(db.connection.db, 'acl_'));
      _winston2.default.verbose('User::Acl::Init::Success');
      return resolve(acl);
    });
  });
}

function getAcl() {
  return acl;
}

let service = { init: init, getAcl: getAcl };

exports.default = service;
exports.init = init;
exports.getAcl = getAcl;