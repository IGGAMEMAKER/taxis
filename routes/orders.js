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

var request = require('superagent');


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

  logger.log('JSON parsed correctly');

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

          results.forEach((rrr) => {
            orderNotifier.addOrder(rrr._id)
              .then(a => {
                logger.log('orderNotifier', rrr, a);
              });
          });

          return result;
        });
    });
    // .then(sendOrdersToOrderServer(orders, userId))
}));

router.get('/test-event/:id', respond(req => {
  var orderId = req.params.id;

  return orderNotifier.addOrder(orderId);
}));

const computeRoutePathPrice = (start, end, duration) => {
  // start and end are objects with structure
  // { lat: value, lng: value }

  return duration;
};

router.get('/route/price', respond(req => {
  // test url:
  // http://localhost/orders/route/price?destinationLatitude=46.340056&departureLatitude=46.340863&destinationLongitude=48.036575&departureLongitude=48.040362
  const { query } = req;

  let totalDuration;
  const {
    destinationLatitude,
    departureLatitude,
    destinationLongitude,
    departureLongitude
  } = query;

  logger.debug(`/route/price ${destinationLatitude}, ${destinationLongitude}`);
  logger.debug(`${departureLatitude}, ${departureLongitude}`);

  var key = 'AIzaSyCL921mwdCIwz4uKJOjBfRAFDmRmZLgjPY';

  var origin = `${departureLatitude},${departureLongitude}`;
  var destination = `${destinationLatitude},${destinationLongitude}`;

  var url = 'https://maps.googleapis.com/maps/api/directions';

  return new Promise((resolve, reject) => {
    request
      .get(`${url}/json?mode=driving&origin=${origin}&destination=${destination}&key=${key}`)
      .end((err, data) => {
        if (err) return reject(err);

        const route = data.body.routes[0].legs[0];
        const { steps } = route;
        totalDuration = route.duration.value;

        logger.debug(`duration in seconds: ${totalDuration}`);
        totalDuration = Math.ceil(totalDuration / 60);

        const result = steps.map(step => {
          const duration = step.duration.value;
          const start = step.start_location;
          const end = step.end_location;

          const price = computeRoutePathPrice(start, end, duration);

          return { duration, start, end, price };
        });

        logger.log(result);

        const price = result.map(r => r.price).reduce((p, c) => p + c);

        logger.log(`summary price is: ${price},  duration: ${totalDuration}`);
        // resolve({ price: 1600, duration: 20 });
        resolve({ price, duration: totalDuration });
      });
  });
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

  return api.orders.setStatus(orderId, status);
}));

module.exports = router;
