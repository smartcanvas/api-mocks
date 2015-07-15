var express = require('express');
var path = require('path');
//var logger = require('morgan');
//var bodyParser = require('body-parser');

var routes = require('./routes/index');
var topics = require('./routes/topics');

var app = express();

//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// Routes: configure your API routes here
app.use('/', routes);
app.use('/topic/*', topics);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
