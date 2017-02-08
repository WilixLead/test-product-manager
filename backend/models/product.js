'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = new mongoose.Schema({
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  title: {type: mongoose.Schema.Types.String},
  cost: {type: mongoose.Schema.Types.Number},
  retail_cost: {type: mongoose.Schema.Types.Number}
});

Schema.plugin(autoIncrement.plugin, { 
  model: 'Product', 
  field: 'productId',
  startAt: 1
});

module.exports = mongoose.model('Product', Schema);