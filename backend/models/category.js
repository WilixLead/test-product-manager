'use strict';

const mongoose = require('mongoose');

const Scheme = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String},
});

module.exports = mongoose.model('Category', Scheme);