'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShirtSchema = new Schema({
  name: String,
  color: String,
  url: String,
  type: {type: String, default: 'Shirt'}
});

module.exports = mongoose.model('Shirt', ShirtSchema);