const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const createError = require('http-errors');
const Promise = require('bluebird');
const debug = require('debug')('storageApp:server');
const app = express();

const itemRouter = require('./route/item-router.js');
// const apiRouter = require('./route/api-router.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/item';
// const MONGODB_URI = "mongodb://" + config.mongo.user + ":" + mongoPassword + "@" +
//   config.mongo.hostString

mongoose.Promise = Promise;

if (process.env.APP_CONFIG) {
  const config = JSON.parse(process.env.APP_CONFIG);
  const mongoPassword = 'Kesha5';
  var mongoUri = "mongodb://" + config.mongo.user + ":" + mongoPassword + "@" +
    config.mongo.hostString;
} else {
  var mongoUri = 'mongodb://localhost/item';
}
console.log(mongoUri);
mongoose.connect(mongoUri);

app.use(morgan('dev'));
app.use(cors());
// app.use(apiRouter);
app.use(itemRouter);
app.use(errors);

app.listen(PORT, '0.0.0.0', function(err) {
  console.log(`server up: ${PORT}`)
});

// app.listen(PORT, () => {
//   console.log(`server up: ${PORT}`);
// });
