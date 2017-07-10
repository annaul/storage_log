const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('storageApp:location-router');

const Item = require('../model/item.js');

const itemRouter = module.exports = Router();

itemRouter.post('/api/item', function(req, res, next) {
  debug('POST: /api/item');

  req.body.itemID = req.item._id;
});
