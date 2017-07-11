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

itemRouter.get('/api/item/:id', function(req, res, next) {
  debug('get: /api/item/:id');

  Item.findById(req.params.id)
  .then(item => res.json(item))
  .catch( err => next(createError(404, err.message)));
});

itemRouter.put('/api/item/:id', jsonParser, function(req, res, next) {
  debug('put: /api/item/:id');

  Item.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( item => res.json(item))
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

itemRouter.delete('/api/item/:id', function(req, res, next) {
  debug('delete: /api/item/:id');
  Item.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
