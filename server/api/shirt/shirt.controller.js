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
  var fileExtension, file;
  
  req.busboy.on('field', function(fieldname, val) {
    console.log('on field');
    newShirt[fieldname] = val;
    });

  req.busboy.on('file', function(fieldname, _file, filename, encoding, mimetype) {
    console.log('on file');
    fileExtension = filename.split('.').pop();
    file = _file
    file.resume()
  });

  req.busboy.on('finish', function(please) {
    console.log('on finish')
    Shirt.create(newShirt, function(err, shirt) {
      if(err) { return handleError(res, err); }
      console.log(shirt);
      console.log(file)
      var shirtID = shirt.name
      var fstream = fs.createWriteStream(path.join(__dirname,'..' , '..', 'uploads/images/shirts', shirtID + '.' + fileExtension));
        file.pipe(fstream);
        fstream.on('error', function(err) {
          console.log(err);
        })
        fstream.on('close', function () {
          res.send(200);
        });
      });
  
  });

  req.pipe(req.busboy);



};

exports.easy = function(req, res) {

  var body = {};

  req.busboy.on('field', function(fieldname, val) {
    console.log('on field');
    body[fieldname] = val;
    });
  
  req.busboy.on('finish', function() {
    console.log(body);
   var newShirt = {
      name: body.name,
      color: body.color,
      url: "uploads/images/shirts/" + body.name + '_720.png',
      type: "shirt"
    }

    Shirt.create(newShirt, function(err, shirt) {
      if(err) { return handleError(res, err); }
      res.send(200)
      });
    });
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