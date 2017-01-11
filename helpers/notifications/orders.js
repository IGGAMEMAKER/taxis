var notifier = require('../notify');

var notify = (id, object) => {
  return notifier.notify('/orders/' + id, object);
};

module.exports = {
  pickOrder: (id, driverId) => {
    // can be fired more than once per order
    return notify(id, { tag: 'pick-order', driverId });
  },

  driverArrived: (id, driverId) => {
    // can be fired more than once (depends on needed number of drivers)
    return notify(id, { tag: 'driver-arrived', driverId });
  },

  driverChosen: (id, drivers) => {
    // will be fired once (if user will not be able to edit driver list)
    return notify(id, { tag: 'driver-chosen', drivers });
  },

  clientPicked: (id) => {
    // maybe need driverId too? for multi-client orders
    return notify(id, { tag: 'client-picked' });
  },

  orderFinished: (id) => {
    return notify(id, { tag: 'order-finished' });
  }
};
