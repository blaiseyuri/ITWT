'use strict';
var fs = require('fs');
var express = require('express');
var router = express.Router();
var path = require("path");


router.post('/', function (req, res) {

  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var fstream = fs.createWriteStream(path.join(__dirname, '..', 'uploads/images', filename));
      file.pipe(fstream);
      fstream.on('close', function () {
        res.send(200);
      });
  });
  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    console.log(key, value, keyTruncated, valueTruncate)
  });
  req.pipe(req.busboy);
});

module.exports = router;