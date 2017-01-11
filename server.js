var app = require('./app');
var orderServerApp = require('./servers/EventServer');

// var swaggerApp = require('./servers/SwaggerServer');

var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://', host, port);
});

// var http = require('http');
// var eventServer = http.createServer(orderServerApp);
// var io = require('socket.io').listen(eventServer);

// eventServer.listen(4001);

var eventServer = require('./servers/EventServer');

function handler(req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
}
