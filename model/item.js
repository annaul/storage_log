const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('storageApp:item-model');

const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

const Schema = mongoose.Schema;

const itemSchema = Schema ({
  itemID: { type: Schema.Types.ObjectId, required: true },
  itemName: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
  status: { type: String, required: false },
  description: { type: String, required: false },
  location: { type: String, required: true },
  photo: { type: String }
});
