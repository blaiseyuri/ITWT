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
  var fs = require('fs');
  var path = require('path');
  var newShirt = {};
  
  req.busboy.on('field', function(fieldname, val) {
    console.log(fieldname, val);
    newShirt[fieldname] = val;
    });

  req.busboy.on('finish', function(please) {

    Shirt.create(newShirt, function(err, shirt) {
      if(err) { return handleError(res, err); }
      console.log(shirt);
      req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var fileExtension = filename.split('.').pop();
        var shirtID = shirt._id.toString();
        var fstream = fs.createWriteStream(path.join(__dirname,'..' , '..', 'uploads/images', shirtID + '.' + fileExtension));
          file.pipe(fstream);
          fstream.on('close', function () {
            res.send(200);
          });
      });
  
  req.pipe(req.busboy);
  });
  })

  req.pipe(req.busboy);



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