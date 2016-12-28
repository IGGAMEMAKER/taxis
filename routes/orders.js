var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');

var response = require('../helpers/response');
var error = response.error;
var respond = response.respond;

var STATUSES = require('../constants/order-statuses');

var transport = require('../helpers/transport');

var responsePromisify = require('../helpers/response-promisify');

router.get('/', authentication.isAuthenticated, responsePromisify(req => {
  return api.orders.all();
}));

var sendOrdersToOrderServer = (orders, userId) => result => {
  return transport.orderServer('/orders/add', { orders, userId });
};

router.post('/', (req, res) => {
  logger.log('POST orders', req.body);

  var userId = req.body.phone;
  var orders = JSON.parse(req.body.orders);

  orders.forEach((o, i) => {
    orders[i].userId = userId;
    orders[i].status = STATUSES.ORDER_STATUS_INITIALIZED;
  });

  logger.log(orders);

  api.orders.addList(orders, 0, [])
    .then(result => {
      return api.users.getOrSave(userId)
        .then(r => {
          var results = Object.assign({ result, user: r });

          logger.log(results);
          return results;
        });
    })
    .then(respond(res))
    // .then(sendOrdersToOrderServer(orders, userId))
    .catch(error('', res));
});

router.get('/drivers', authentication.isAuthenticated, responsePromisify(req => {
  return api.drivers.all()
    .then(drivers => {
      return drivers.map(d => {
        return {
          name: d.name,
          driverId: d.driverId,
          mark: d.mark || 8,
          age: d.age || 41,
          experience: 10
        };
      });
    });
}));

// router.patch('/drivers', authentication.isAuthenticated, responsePromisify(req => {
//   return api.orders.setDrivers();
// }));

router.get('/all', authentication.isAdmin, responsePromisify(req => {
  return api.orders.all();
}));

router.get('/clearAll', authentication.isAdmin, responsePromisify(req => {
  return api.orders.clear();
}));

router.patch('/cancel/:orderId', authentication.check, responsePromisify(req => {
  var orderId = req.params.orderId;
  var status;

  if (req.isUser) {
    // canceled by client
    status = STATUSES.ORDER_STATUS_CANCELED_BY_CLIENT;
  } else if (req.isDriver) {
    // canceled by driver
    status = STATUSES.ORDER_STATUS_CANCELED_BY_DRIVER;
  } else {
    // canceled by admin
    status = STATUSES.ORDER_STATUS_CANCELED_BY_ADMIN;
  }

  return api.orders.setStatus(orderId, status);
}));

module.exports = router;
