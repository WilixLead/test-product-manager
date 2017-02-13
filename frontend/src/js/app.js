'use strict';
require('angular');
let promise = require('angular-promise-polyfill');

let uiBootstrap = require('angular-ui-bootstrap');

angular
  .module('app', [
    promise,
    uiBootstrap
  ]);

require('./services/api-service');
require('./services/product-service');
require('./services/category-service');

require('./controllers/main-controller');
require('./controllers/category-controller');
require('./controllers/product-controller');
