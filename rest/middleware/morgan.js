var express = require('express');

var FileStreamRotator = require('file-stream-rotator');
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');

var logDirectory = path.join(__dirname, 'logs');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

var app = express();

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));
accessLogStream.write("ssss");