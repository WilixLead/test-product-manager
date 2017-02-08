'use strict';

const mongoose = require('mongoose');

const Scheme = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.Number},
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  title: {type: mongoose.Schema.Types.String},
  cost: {type: mongoose.Schema.Types.Number},
  retail_cost: {type: mongoose.Schema.Types.Number}
});

module.exports = mongoose.model('Product', Scheme);