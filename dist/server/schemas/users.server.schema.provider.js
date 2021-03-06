'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('../config/mongoose');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _generatePassword = require('generate-password');

var _generatePassword2 = _interopRequireDefault(_generatePassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Schema = _mongoose.mongoose.Schema;

/**
 * A Validation function for local strategy email
 */
let validateLocalStrategyEmail = function validateLocalStrategyEmail(email) {
  return this.type !== 'local' || _validator2.default.isEmail(email, { require_tld: false });
};

let ProviderSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  hashedPassword: {
    type: String
  },
  salt: {
    type: String
  },
  timestamps: {
    updated: {
      type: Date
    },
    created: {
      type: Date,
      default: Date.now
    }
  },
  type: {
    type: String,
    enum: ['local'],
    required: true
  }
});

/**
 * Virtuals
 */
ProviderSchema.virtual('clearpassword').set(function (password) {
  this.salt = _crypto2.default.randomBytes(16).toString('base64');
  return this.hashedPassword = this.hashPassword(password);
});

/**
* PreSave
*/
ProviderSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.timestamps.updated = Date.now();
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
ProviderSchema.methods.hashPassword = function (password) {
  return _crypto2.default.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
};

/**
 * Create instance method for authenticating user
 */
ProviderSchema.methods.authenticate = function (password) {
  return this.hashedPassword === this.hashPassword(password);
};

/**
* Generates a random passphrase that passes the owasp test
*/
ProviderSchema.statics.generateRandomPassphrase = function () {
  return new Promise(function (resolve, reject) {

    let password = _generatePassword2.default.generate({
      length: Math.floor(Math.random() * 10) + 10, // randomize length between 10 and 20 characters
      numbers: true,
      symbols: false,
      uppercase: true,
      excludeSimilarCharacters: true
    });

    resolve(password);
  });
};

ProviderSchema.set('toJSON', {
  transform: function transform(doc, ret, options) {
    delete ret.hashedPassword;
    delete ret.salt;
    return ret;
  }
});

exports.default = ProviderSchema;