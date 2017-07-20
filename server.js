const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const createError = require('http-errors');
const Promise = require('bluebird');
const debug = require('debug')('storageApp:server');
const app = express();

const itemRouter = require('./route/item-router.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/item';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());
app.use(itemRouter);
app.use(errors);

app.listen(process.env.PORT, '0.0.0.0', function(err) {
  console.log('server runninng at ' + http.url );
});
