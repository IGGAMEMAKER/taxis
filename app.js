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

// app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));


// set Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/orders', require('./routes/orders'));
app.use('/drivers', require('./routes/drivers'));
app.use('/authentication', require('./routes/authentication'));
app.use('/userPreferences', require('./routes/userPreferences'));
app.use('/driverPreferences', require('./routes/driverPreferences'));

// app.use(express.static('public'));
// app.use('/docs', express.static('public/docs/swagger-ui-master'));

// app.use('/specification', express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'public/docs/swagger-ui-master/dist/')));


// app.get('/docs', (req, res) => {
//   // res.sendFile('/home/gaginho/coding/taxis/public/docs/swagger-ui-master/dist/index.html');
//   res.sendFile('index.html', { root: __dirname + '/public/docs/swagger-ui-master/dist/' });
// });

app.get('/specification', (req, res) => {
  res.sendFile('swagger.yaml', {
    root: __dirname + '/public/docs/',
    headers: {
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, PATCH',
      'Access-Control-Allow-Origin': '*'
    }
  });
});

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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
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


module.exports = app;
