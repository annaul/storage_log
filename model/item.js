const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('storageApp:item-model');

const Promise = require('bluebird');

const Schema = mongoose.Schema;

const itemSchema = Schema ({
  itemName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, required: false },
  description: { type: String, required: false },
  location: { type: String, required: true },
  photo: { type: String }
});

const Item = module.exports = mongoose.model('item', itemSchema);
