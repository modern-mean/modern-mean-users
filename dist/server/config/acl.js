'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.get = exports.init = undefined;

var _acl = require('acl');

var _acl2 = _interopRequireDefault(_acl);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _mongoose = require('modern-mean-core-material/dist/server/app/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let acl;

function init() {
  return new Promise((resolve, reject) => {
    _logger2.default.debug('User::Acl::Init::Start');

    _mongoose2.default.connect().then(db => {
      acl = new _acl2.default(new _acl2.default.mongodbBackend(db.connection.db, 'acl_'));
      _logger2.default.verbose('User::Acl::Init::Success');
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

exports.default = service;
exports.init = init;
exports.get = get;
exports.destroy = destroy;