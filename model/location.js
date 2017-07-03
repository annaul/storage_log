const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('storageApp:location-model');

const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

const Schema = mongoose.Schema;

const locationSchema = ({
  locationID: { type: Schema.Types.ObjectId, required: true },
  locationName: { type: String, required: true },
  desrcription: { type: String, required: true },
  photo: { type: String, required: false },
  items: [{ type: Schema.Types.ObjectId, ref: 'item' }]
});

const Location = module.exports = mongoose.model('location', locationSchema);

Location.findByIdAndAddItem = function(id, item) {
  debug('findByIdAndAddItem');

  return Location.findById(id)
  .then( item => {
    this.tempLocation.items.push(item._id);
    this.tempItem = item;
    return this.tempLocation.save();
  })
  .then( () => {
    return this.tempItem;
  })
  .catch( err => Promise.reject(err));
}
