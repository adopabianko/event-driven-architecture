var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  handphone: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    required: true
  },
  activation_code: {
    type: Number,
    required: true
  },
  activation_at: {
    type: Date
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
});

userSchema.plugin(uniqueValidator);

var users = mongoose.model('users', userSchema);

module.exports = users;
