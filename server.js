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

// const PORT = process.env.APP_CONFIG || 3000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/storageApp';

const http = require('http');

// APP_CONFIG = {
//   "mongo": {
//     "hostString": "mongodb:27017/storageApp",
//     "user": "anna",
//     "db": "storageApp"
//   }
// }

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var config = JSON.parse(process.env.APP_CONFIG);
  var MongoClient = require('mongodb').MongoClient;
  var mongoPassword = 'Kesha5';

  MongoClient.connect(
    // "mongodb://" + config.mongo.user + ":" + mongoPassword + "@" +
    config.mongo.hostString,
    function(err, db) {
      if(!err) {
        res.end("We are connected to MongoDB\n");
      } else {
        res.end("Error while connecting to MongoDB\n");
      }
    });
});


// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI)

app.use(morgan('dev'));
app.use(cors());
app.use(itemRouter);
app.use(errors);

server.listen(process.env.APP_CONFIG);
// app.listen(PORT, () => {
//   console.log(`server up: ${PORT}`);
// });

// server.listen(PORT, '0.0.0.0', function(err) {
//   console.log(`server up: ${PORT}`)
// });
