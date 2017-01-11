var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var devErrorHandler = require('../middlewares/error-handler');

// set Routes
// app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(devErrorHandler);
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var respond = require('../helpers/response-promisify');
var api = require('../helpers/api');

var checkCredentials = (req, res, next) => {
  next();
};

// app.get('/orders/add', checkCredentials, respond(req => {
//   logger.log('EventServer', 'orders add', req.body);
//   return api.orders.all();
// }));


var eventServer = app.listen(4001, function () {
  var host = eventServer.address().address;
  var port = eventServer.address().port;

  console.log('Example app listening at http://', host, port);
});

var io = require('socket.io')(eventServer);
// var fs = require('fs');

io.on('connection', function (socket) {
  console.log('hoorray. Someone Connected!', new Date());
  console.log(socket.id);
  // console.log(socket.rooms);
  // console.log(socket.client.request);

  // socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });
});

module.exports = app;
