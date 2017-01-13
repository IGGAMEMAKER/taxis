var notifier = require('../notify');

var notify = (id, event, object) => {
  return notifier.notify('/orders/' + id, event, object);
};

module.exports = {
  addOrder: (id) => {
    return notify(id, 'orderAdded', {});
  },
  pickOrder: (id, driverId) => {
    // can be fired more than once per order
    return notify(id, 'pick-order', driverId);
  },

  driverArrived: (id, driverId) => {
    // can be fired more than once (depends on needed number of drivers)
    return notify(id, 'driver-arrived', driverId);
  },

  driverChosen: (id, drivers) => {
    // will be fired once (if user will not be able to edit driver list)
    return notify(id, 'driver-chosen', drivers);
  },

  clientPicked: (id) => {
    // maybe need driverId too? for multi-client orders
    return notify(id, 'client-picked', {});
  },

  orderFinished: (id) => {
    return notify(id, 'order-finished', {});
  }
};
