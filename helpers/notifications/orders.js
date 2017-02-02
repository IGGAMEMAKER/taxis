var notifier = require('../notify');

// var eventServerAddress = 'http://localhost:4000/orders/event/';

// const createOrderRoom = return new Promise((resolve, reject) => {
//   request
//     .post(eventServerAddress, { channel, event, data, push })
//     .end((err, res) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(1);
//       }
//     });
// });

var notify = (id, event, object) => {
  return notifier.notify('/orders/' + id, event, Object.assign(object, { orderId: id }));
};

module.exports = {
  addOrder: (id) => {
    return notify(id, 'orderAdded', {});
  },

  cancelOrder: (id, status) => {
    return notify(id, 'order-cancelled', { status });
  },

  pingDriverChannel: (id, msg) => {
    return notify(id, 'drivers', { msg });
  },

  pickOrder: (id, driverId) => {
    // can be fired more than once per order
    return notify(id, 'pick-order', { driverId });
  },

  driverArrived: (id, driverId) => {
    // can be fired more than once (depends on needed number of drivers)
    return notify(id, 'driver-arrived', { driverId });
  },

  driverChosen: (id, drivers) => {
    // will be fired once (if user will not be able to edit driver list)
    return notify(id, 'driver-chosen', { drivers });
  },

  clientPicked: (id) => {
    // maybe need driverId too? for multi-client orders
    return notify(id, 'client-picked', {});
  },

  orderFinished: (id) => {
    return notify(id, 'order-finished', {});
  }
};
