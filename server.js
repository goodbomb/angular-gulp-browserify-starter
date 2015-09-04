'use strict';
// This is the PROD server config file used to serve your AngularJS app on a service like Heroku
var winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: 'somefile.log',
      level: 'debug'
    })
  ]
});

logger.error("I'm just getting started!");

var express = require('express');
var url = require('url');
var proxy = require('proxy-middleware');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var API_URL = process.env.API_URL || 'http://localhost:3000/';

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));

server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// Proxy settings for connecting to API
// process.env.API_URL is an environment variable set on Heroku
app.use('/api', proxy(url.parse(API_URL)));

io.on('connection', function (socket) {
  logger.info("Hi! Someone just connected");
  socket.emit('socket:message', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});