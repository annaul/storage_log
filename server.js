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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/storageApp';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.use(morgan('dev'));
app.use(cors());
app.use(itemRouter);
app.use(errors);

// app.listen(PORT, () => {
//   console.log(`server up: ${PORT}`);
// });

app.listen(PORT, '0.0.0.0', function(err) {
  console.log(`server up: ${PORT}`);
});
