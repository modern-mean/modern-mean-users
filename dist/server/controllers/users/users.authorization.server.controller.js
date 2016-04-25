'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.read = undefined;

var _acl = require('../../config/acl');

var _acl2 = _interopRequireDefault(_acl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function read(req, res) {
  let response = {};

  return _acl2.default.get().userRoles(req.user._id.toString()).then(roles => {
    response.roles = roles;
    return roles;
  }).then(roles => {
    return _acl2.default.get().whatResources(roles).then(resources => {
      response.resources = resources;
      return resources;
    });
  }).then(() => {
    return res.json(response);
  }).catch(err => {
    return res.status(500).json(err.message);
  });
}

let controller = { read: read };

exports.default = controller;
exports.read = read;