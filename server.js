var app = require('./app');
var orderServerApp = require('./servers/EventServer');

var swaggerApp = require('./servers/SwaggerServer');

var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://', host, port);
});

var orderServer = orderServerApp.listen(4001, function () {
  var host = orderServer.address().address;
  var port = orderServer.address().port;

  console.log('Example app listening at http://', host, port);
});

var swaggerServer = swaggerApp.listen(4000, function () {
  var host = swaggerServer.address().address;
  var port = swaggerServer.address().port;

  console.log('Example app listening at http://', host, port);
});
