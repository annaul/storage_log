const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('storageApp:location-router');

const Location = require('../model/item.js');

const locationRouter = module.exports = Router();

locationRouter.post('/api/item', function(req, res, next) {
  debug('POST: /api/item');

  req.body.itemID = req.item._id;

});
