var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var respond = require('../helpers/response-promisify');
var api = require('../helpers/api');

var mockerPromise = require('../helpers/promise-mock');

var checkCredentials = (req, res, next) => {
  next();
};

var logger2 = require('../helpers/logger');
var app = express();

var firer = express();

var eventFirer = firer.listen(4001, function () {
  var host = eventFirer.address().address;
  var port = eventFirer.address().port;

  console.log('eventFirer app listening at http://', host, port);
});

var io = require('socket.io')(eventFirer);

io.on('connection', function (socket) {
  // console.log(socket.rooms);
  // console.log(socket.client.request);
  console.log('hoorray. Someone Connected!', new Date(), socket.id);

  socket.join('/drivers');

  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('joinOrderRoom', function (orderId) {
    socket.join(`/orders/${orderId}`);
  });
});

var emit = (room, event, data, push) => {
  logger2.log('EMIT WS: ', room, event);
  io.of(room).emit(event, data);
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var devErrorHandler = require('../middlewares/error-handler');

// set Routes
// app.use('/', require('./routes/index'));

var orders = {};
const driverRoom = io.of('/drivers');

driverRoom.on('connect', function (socket) {
  logger2.log('connection to driverRoom in EventServer');

  setInterval(() => {
    socket.emit('news', { hello: 'world' });
    driverRoom.emit('news', { hello: 'world', broadcast: true });
  }, 2000);
});

app.post('/orders/event', respond(req => {
  logger2.log('POST /orders/event', req.body);
  const { channel, event, data, push } = req.body;

  if (event === 'orderAdded') {
    const orderId = data.orderId;

    driverRoom.emit('orderAdded', data);

    orders[orderId] = io.of(`/orders/${orderId}`);

    orders[orderId].on('connection', function (socket) {
      console.log('someone connected to order', orderId);
      socket.emit(event, data);

      setTimeout(() => { emit(channel, event, data); }, 1000);
    });

    orders[orderId].on('disconnect', function (socket) {
      console.log('someone disconnected from order', orderId);
    });
  }

  if (event === 'drivers') {
    driverRoom.emit('orderAdded', data);
  }

  emit(channel, event, data);
  logger2.log('emited');
  return mockerPromise({ msg: req.body });
}));


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

var eventServer = app.listen(4000, function () {
  var host = eventServer.address().address;
  var port = eventServer.address().port;

  console.log('Example app listening at http://', host, port);
});

// setInterval(() => {
//   emit('/orders/aosjdaoisdj', 'orderAdded', {});
// }, 1000);


// app.post('/orders/rooms/:id', respond(req => {
//   var orderId = req.params.id;
//
//   emit('/orders/' + orderId, 'orderAdded', { date: new Date, orderId });
//   return mockerPromise(orderId);
// }));

module.exports = app;
