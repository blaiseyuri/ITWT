'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShirtSchema = new Schema({
  color: String,
  type: {type: String, default: 'Shirt'}
});

module.exports = mongoose.model('Shirt', ShirtSchema);