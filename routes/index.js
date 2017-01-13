var express = require('express');
var router = express.Router();

var orderNotifier = require('../helpers/notifications/orders');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ws-test', function (req, res) {
  res.render('ws-test');
});

router.get('/order-test/:id', function (req, res) {
  var orderId = req.params.id;

  res.render('order-test', { orderId });

  var driverId = '10jda08shda09s0d';
  var drivers = [driverId, driverId + 'asld2'];

  setTimeout(() => { orderNotifier.addOrder(orderId); }, 1000);
  setTimeout(() => { orderNotifier.pickOrder(orderId, driverId); }, 3000);
  setTimeout(() => { orderNotifier.driverArrived(orderId, driverId); }, 5000);
  setTimeout(() => { orderNotifier.driverChosen(orderId, drivers); }, 7000);
  setTimeout(() => { orderNotifier.clientPicked(orderId); }, 9000);
  setTimeout(() => { orderNotifier.orderFinished(orderId); }, 11000);
});

// setInterval(() => { orderNotifier.addOrder('aosjdaoisdj'); }, 3000);

module.exports = router;
