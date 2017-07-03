'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('storageApp:user-model');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: { type: String, unique: true, sparse: true },
  password: { type: String },
  timeStamp: { type: Date, default: Date.now },
  email: { type.mongoose.SchemaTypes.Email, unique: true },
  provider: { type: String, unique: true, sparse: true }
});
