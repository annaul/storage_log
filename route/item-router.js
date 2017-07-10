'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('storageApp:item-router');

const Item = require('../model/item.js');

const itemRouter = module.exports = Router();

itemRouter.post('/api/item', jsonParser, function(req, res, next) {
  debug('POST: /api/item');

  req.body.timestamp = new Date();
  new Item(req.body).save()
  .then(item => res.json(item))
  .catch(next)
});
