// Module dependencies
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var errorHandler = require('./error_handler');

// Initialize the Express framework
var app = express();

// Morgan configuration: logs all the requests
var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // make sure dir exists
var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
});
app.use(morgan('dev', {stream: accessLogStream}));

//validates the client-id and tenant-id
app.use(errorHandler.validateClientId);
app.use(errorHandler.validateTenantId);

// Routes: configure your API routes here
// The mocks are executed here, one in each file under /routes directory
var topics = require('./routes/topics');
app.use('/topic', topics);

// generic error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    return res.status(404).json(errorHandler.buildBasicErrorMessage( 404, 'Not Found: ' + req.url ))
});

// error 500: something went wrong
app.use(function(err, req, res, next) {
    return res.status(500).json(errorHandler.buildBasicErrorMessage( 500, err.message ));
});

// initializes the server on port 3000
var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('API Mocks listening at %s', port);
});

module.exports = app;
