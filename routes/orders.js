var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');
var response = require('../helpers/response');

var error = response.error;
var respond = response.respond;

var STATUSES = require('../constants/order-statuses');

// router.get('/', authentication.isAuthenticated, (req, res) => {
router.get('/', (req, res) => {
  api.orders.all()
    .then(respond(res))
    .catch(error('', res));
});

router.post('/', (req, res) => {
  var userId = req.body.phone;
  var orders = req.body.orders;

  orders.forEach((o, i) => {
    orders[i].userId = userId;
    orders[i].status = STATUSES.ORDER_STATUS_INITIALIZED;
  });

  logger.log(orders);

  // api.users.find(userId)
  //   .then(u => {
  //     if (!u) return api.users.add(userId, '');
  //
  //     return api.orders.addList(orders, 0, []);
  //   })
  api.orders.addList(orders, 0, [])
    .then(respond(res))
    .catch(error('', res));
});

router.get('/all', authentication.isAdmin, (req, res) => {
  api.orders.all()
    .then(respond(res))
    .catch(error('', res));
});


router.get('/clearAll', authentication.isAdmin, (req, res) => {
  api.orders.clear()
    .then(respond(res))
    .catch(error('', res));
});

router.patch('/cancel/:orderId', authentication.check, (req, res) => {
  var orderId = req.params.orderId;
  var promise;

  if (req.isUser) {
    // canceled by client
    promise = () => api.orders.setStatus(orderId, STATUSES.ORDER_STATUS_CANCELED_BY_CLIENT);
  } else {
    if (req.isDriver) {
      // canceled by driver
      promise = () => api.orders.setStatus(orderId, STATUSES.ORDER_STATUS_CANCELED_BY_DRIVER);
    } else {
      // canceled by admin
      promise = () => api.orders.setStatus(orderId, STATUSES.ORDER_STATUS_CANCELED_BY_ADMIN);
    }
  }

  promise()
    .then(respond(res))
    .catch(error('', res));
});

// router.patch('/', authentication.isAuthenticated, (req, res) => {
//   var changes = req.body.changes;
//   var phone = req.body.phone;
//
//   // check parameters
//
//   api.users.update(phone, changes)
//     .then(respond(res))
//     .catch(error('', res));
// });

module.exports = router;
