require('dotenv').config({ path: './.env' });

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var busboy = require('connect-busboy');

var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileUpload = require('./routes/file-upload');

var fileDownload = require('./routes/file-download');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(busboy({ immediate: true }));
app.use(bodyParser.raw({type: 'application/octet-stream', limit: '2mb'}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fileUpload', fileUpload);
app.use('/files', fileDownload);

module.exports = app;
