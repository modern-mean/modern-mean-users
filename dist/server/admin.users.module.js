'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _adminServer = require('./routes/admin.server.routes');

var _adminServer2 = _interopRequireDefault(_adminServer);

var _adminServer3 = require('./policies/admin.server.policy');

var _adminServer4 = _interopRequireDefault(_adminServer3);

var _acl = require('./config/acl');

var _acl2 = _interopRequireDefault(_acl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(app) {
  return new Promise(function (resolve, reject) {
    _winston2.default.debug('UsersAdmin::Init::Start');
    _acl2.default.init().then(_adminServer4.default.policy).then(() => {
      _adminServer2.default.init(app).then(() => {
        _winston2.default.verbose('UsersAdmin::Routes::Success');
        return resolve(app);
      }).catch(err => {
        _winston2.default.error(err);
        return reject(err);
      });
    }).catch(err => {
      _winston2.default.error(err);
      return reject(err);
    });
  });
}

let service = { init: init };

exports.default = service;
exports.init = init;