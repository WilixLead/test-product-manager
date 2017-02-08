'use strict';

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String},
});

module.exports = mongoose.model('Category', Schema);