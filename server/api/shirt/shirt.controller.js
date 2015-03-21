'use strict';

var _ = require('lodash');
var Shirt = require('./shirt.model');

// Get list of shirts
exports.index = function(req, res) {
  Shirt.find(function (err, shirts) {
    if(err) { return handleError(res, err); }
    return res.json(200, shirts);
  });
};

// Get a single shirt
exports.show = function(req, res) {
  Shirt.findById(req.params.id, function (err, shirt) {
    if(err) { return handleError(res, err); }
    if(!shirt) { return res.send(404); }
    return res.json(shirt);
  });
};

// Creates a new shirt in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Shirt.create(req.body, function(err, shirt) {
    if(err) { return handleError(res, err); }
    return res.json(201, shirt);
  });
};

// Updates an existing shirt in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Shirt.findById(req.params.id, function (err, shirt) {
    if (err) { return handleError(res, err); }
    if(!shirt) { return res.send(404); }
    var updated = _.merge(shirt, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, shirt);
    });
  });
};

// Deletes a shirt from the DB.
exports.destroy = function(req, res) {
  Shirt.findById(req.params.id, function (err, shirt) {
    if(err) { return handleError(res, err); }
    if(!shirt) { return res.send(404); }
    shirt.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}