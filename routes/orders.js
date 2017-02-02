var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');
var respond = require('../helpers/response-promisify');

var STATUSES = require('../constants/order-statuses');

var transport = require('../helpers/transport');

var Promise = require('bluebird');

var orderNotifier = require('../helpers/notifications/orders');

const calculateRoutePrice = require('../helpers/calculate-route-price');


var sendOrdersToOrderServer = (orders, userId) => result => {
  return transport.orderServer('/orders/add', { orders, userId });
};

router.get('/', authentication.isAuthenticated, respond(req => {
  return api.orders.all();
}));

router.post('/', respond(req => {
  logger.log('POST orders', req.body);

  var userId = req.body.phone;
  // var orders = JSON.parse(req.body.orders);
  var orders = req.body.orders;

  if (!Array.isArray(orders)) throw new Error('parameter orders is not an array');

  logger.log('JSON parsed correctly', userId, orders);

  orders.forEach((o, i) => {
    orders[i].userId = userId;
    orders[i].status = STATUSES.ORDER_STATUS_INITIALIZED;
  });

  logger.log(orders);

  return api.orders.addList(orders, 0, [])
    .then(results => {
      return api.users.getOrSave(userId)
        .then(r => {
          var result = Object.assign({ results, user: r });

          logger.log(result);

          const orderNotifiersArray = results.responses.map(rrr => {
            const orderId = rrr._id;

            logger.debug(`create room in order ${orderId}`);

            // return () => { orderNotifier.addOrder(orderId) };
            return orderNotifier.addOrder(orderId);
          });

          return Promise.all(orderNotifiersArray)
            .then(notificationAnswersList => {
              logger.log('POST /orders notifications', notificationAnswersList);
              return result;
            });
        });
    });
    // .then(sendOrdersToOrderServer(orders, userId))
}));

router.patch('/drivers', authentication.isAuthenticated, respond(req => {
  // attaches driver to order
  const { drivers, orderId } = req.body;

  return api.orders.chooseDrivers(orderId, drivers)
    .then(result => {
      return orderNotifier.driverChosen(orderId, drivers)
        .then(r => result);
    })
    .catch(err => {
      logger.error(err);
      throw err;
    });
}));

router.patch('/pick', authentication.isDriver, respond(req => {
  const orderId = req.body.orderId;
  const driverId = req.driverId;

  return api.orders.pickOrder(orderId, driverId)
  .then(result => {
    return orderNotifier.pickOrder(orderId, driverId)
    .then(r => {
      return result;
    });
  })
  .catch(err => {
    logger.error(err);
    throw err;
  });
}));

router.patch('/pick-client', authentication.isDriver, respond(req => {
  const orderId = req.body.orderId;
  // const driverId = req.driverId;

  return api.orders.pickClient(orderId)
    .then(result => {
      return orderNotifier.clientPicked(orderId)
        .then(r => {
          return result;
        });
    })
    .catch(err => {
      logger.error(err);
      throw err;
    });
}));

router.patch('/driver-arrived', authentication.isDriver, respond(req => {
  const orderId = req.body.orderId;
  const driverId = req.driverId;

  return api.orders.driverArrived(orderId)
    .then(result => {
      return orderNotifier.driverArrived(orderId, driverId)
        .then(r => {
          return result;
        });
    })
    .catch(err => {
      logger.error(err);
      throw err;
    });
}));

router.get('/test-event/:id', respond(req => {
  var orderId = req.params.id;

  return orderNotifier.addOrder(orderId);
}));

router.get('/route/price', respond(req => {
  // test url:
  // http://localhost/orders/route/price?destinationLatitude=46.340056&departureLatitude=46.340863&destinationLongitude=48.036575&departureLongitude=48.040362
  // http://localhost/orders/route/price?destinationLatitude=55.854330&departureLatitude=55.749972&destinationLongitude=37.265097&departureLongitude=37.602590

  const {
    destinationLatitude,
    departureLatitude,
    destinationLongitude,
    departureLongitude
  } = req.query;

  return calculateRoutePrice(destinationLatitude, departureLatitude, destinationLongitude, departureLongitude);
}));

router.get('/drivers', authentication.isAuthenticated, respond(req => {
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

// router.patch('/drivers', authentication.isAuthenticated, respond(req => {
//   return api.orders.setDrivers();
// }));

router.get('/all', authentication.isAdmin, respond(req => {
  return api.orders.all();
}));

router.get('/clearAll', authentication.isAdmin, respond(req => {
  return api.orders.clear();
}));

router.patch('/cancel/:orderId', authentication.check, respond(req => {
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

  return api.orders.setStatus(orderId, status)
    .then(r => {
      return orderNotifier.cancelOrder(orderId, status)
        .then(x => r);
    });
}));

module.exports = router;
