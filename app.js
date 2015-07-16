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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    return res.json(404, { "code": 404, "message": ""})
    var err = new Error('Not Found: ' + req.url);
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
*/

// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/

var server = app.listen(3000, function () {
    var port = server.address().port;

    console.log('API Mocks listening at %s', port);
});

module.exports = app;
