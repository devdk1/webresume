#!/usr/bin/env node
'use strict';

var debug = require('debug')('webresume:server');
var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');

app.use('/', routes);
/**
 * Get port from environment and store in Express.
 */

var port = Number(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

server
  .on('error', (error) => {
    console.log(error);
    process.exit(1);
  })
  .listen(port, () => {
    console.log('Web Resume Server Running on Port:', port);
  });