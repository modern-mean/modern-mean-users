'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModels = exports.models = exports.create = exports.init = undefined;

var _mongoose = require('modern-mean-core-material/dist/server/app/mongoose');

var _logger = require('../config/logger');

var _logger2 = _interopRequireDefault(_logger);

var _usersServerSchema = require('../schemas/users.server.schema.user');

var _usersServerSchema2 = _interopRequireDefault(_usersServerSchema);

var _usersServerSchema3 = require('../schemas/users.server.schema.provider');

var _usersServerSchema4 = _interopRequireDefault(_usersServerSchema3);

var _usersServerSchema5 = require('../schemas/users.server.schema.email');

var _usersServerSchema6 = _interopRequireDefault(_usersServerSchema5);

var _usersServerSchema7 = require('../schemas/users.server.schema.address');

var _usersServerSchema8 = _interopRequireDefault(_usersServerSchema7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let models;

function getModels() {
  return models;
}

function create(req, res, next) {
  req.model = new models.user();
  next();
  return;
}

function init() {
  return new Promise(function (resolve, reject) {
    _logger2.default.debug('User::Model::Init::Start');
    exports.models = models = {};
    if (!models.user) {
      models.user = _mongoose.mongoose.model('User', _usersServerSchema2.default);
    }

    if (!models.provider) {
      models.provider = _mongoose.mongoose.model('Provider', _usersServerSchema4.default);
    }

    if (!models.email) {
      models.email = _mongoose.mongoose.model('Email', _usersServerSchema6.default);
    }

    if (!models.address) {
      models.address = _mongoose.mongoose.model('Address', _usersServerSchema8.default);
    }
    _logger2.default.verbose('User::Model::Init::Success');
    return resolve(models);
  });
}

if (models === undefined) {
  init();
}

let userModel = { init: init, create: create, models: models, getModels: getModels };

exports.default = userModel;
exports.init = init;
exports.create = create;
exports.models = models;
exports.getModels = getModels;