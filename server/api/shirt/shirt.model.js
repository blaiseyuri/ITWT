'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShirtSchema = new Schema({
  url: String,
  color: String,
  type: {type: String, default: 'Shirt'}
});

module.exports = mongoose.model('Shirt', ShirtSchema);