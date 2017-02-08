'use strict';

const mongoose = require('mongoose');
const path = require("path");
const appConfig = require('./../config');
const normalizedPath = path.join(__dirname, './../models');

mongoose.Promise = global.Promise;

// Require and register all models
require("fs")
  .readdirSync(normalizedPath)
  .forEach((file) => {
    require(path.join(__dirname, './../models', file));
  });

module.exports = new Promise((resolve, reject) => {
  try {
    mongoose.connect(appConfig.server.mongodb);
    let db = mongoose.connection;

    db.on('error', (err) => {
      reject(err);
    });
    db.once('open', () => {
      resolve(db);
    });
  } catch (e) {
    reject(e);
  }
});

