var app = require('./app');
var orderServerApp = require('./servers/EventServer');

// var swaggerApp = require('./servers/SwaggerServer');

var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://', host, port);
});

// var http = require('http');
// var orderServer = http.createServer(orderServerApp);
// var io = require('socket.io').listen(orderServer);

// orderServer.listen(4001);

var orderServer = orderServerApp.listen(4001, function () {
  var host = orderServer.address().address;
  var port = orderServer.address().port;

  console.log('Example app listening at http://', host, port);
});

// handle WS connections
var io = require('socket.io')(orderServer);
var fs = require('fs');

function handler (req, res) {
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

io.on('connection', function (socket) {
  console.log('hoorray. Someone Connected!', new Date());
  console.log(socket.id);
  // console.log(socket.rooms);
  // console.log(socket.client.request);

  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });
});
