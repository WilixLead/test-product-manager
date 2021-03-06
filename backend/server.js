'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const server = require('http').Server(app);

const appConfig = require('./config');
const errors = require('./services/error-service');

let mongoPromise = require('./services/mongo-service');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../frontend/static')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

const productRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoriesRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(errors.api.not_found);
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err.name && (err.name == 'ValidationError' || err.name == 'CastError')) {
    res.send({
      success: false,
      error: errors.api.bad_params
    });
  } else {
    res.send({
      success: false,
      error: err
    });
  }
});

mongoPromise.then(() => {
  console.info('MongoDB connected');

  server.listen(appConfig.server.port, () => {
    console.info('Server start listen', appConfig.server.port);
  });
});