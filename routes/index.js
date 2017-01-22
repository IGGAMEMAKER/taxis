var express = require('express');
var router = express.Router();

var orderNotifier = require('../helpers/notifications/orders');
var respond = require('../helpers/response-promisify');

const logger = require('../helpers/logger');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ws-test', function (req, res) {
  res.render('ws-test');
});

router.get('/order-test/:id', function (req, res) {
  var orderId = req.params.id;

  orderNotifier.addOrder(orderId)
    .then(r => {
      res.render('order-test', { orderId });
    })
    .catch(err => {
      res.json({ err });
    });

  var driverId = '10jda08shda09s0d';
  var drivers = [driverId, driverId + 'asld2'];

  setTimeout(() => { orderNotifier.pickOrder(orderId, driverId); }, 3000);
  setTimeout(() => { orderNotifier.driverArrived(orderId, driverId); }, 5000);
  setTimeout(() => { orderNotifier.driverChosen(orderId, drivers); }, 7000);
  setTimeout(() => { orderNotifier.clientPicked(orderId); }, 9000);
  setTimeout(() => { orderNotifier.orderFinished(orderId); }, 11000);
});

router.get('/events', (req, res) => {
  res.render('events', {
    room: req.query.room
  });
});

router.get('/admin/orders', (req, res) => {
  res.render('orders');
});

router.get('/driver-test/:id', respond(req => {
  const orderId = req.params.id;
  logger.log('driver-test', orderId);

  return orderNotifier.pingDriverChannel(orderId, { ggg: 1 })
    .then(r => {
      logger.log('pingDriverChannel', r);

      return r;
    });
}));

// setInterval(() => { orderNotifier.addOrder('aosjdaoisdj'); }, 3000);

module.exports = router;
