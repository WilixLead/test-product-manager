'use strict';
require('angular');

let uiBootstrap = require('angular-ui-bootstrap');

angular
  .module('app', [
    uiBootstrap
  ]);

require('./services/api-service');
require('./services/product-service');

