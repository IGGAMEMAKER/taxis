var app = require('./app');
var orderServerApp = require('./servers/EventServer');

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
