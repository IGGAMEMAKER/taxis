var db = require('../helpers/db');
var Orders = db.wrap('Orders');

var logger = require('../helpers/logger');

var add = (object) => {
  return Orders.save(object);
};

const ORDER_STATUSES = require('../constants/order-statuses');

var saveRecursively = (list, index, responses) => {
  if (index < list.length) {
    return Orders.save(list[index])
      .then(r => {
        responses.push(r);

        return saveRecursively(list, index + 1, responses);
      });
  }

  // logger.log('saveRecursively result' + JSON.stringify(responses));
  return { status: 'ok', responses };
};

var all = () => {
  return Orders.list({});
};

var clear = () => {
  return Orders.remove({});
};

var setStatus = (orderId, status) => {
  return Orders.update({ _id: orderId }, { status });
};

const edit = (orderId, object) => {
  return Orders.update({ _id: orderId }, object);
};

const pickOrder = (orderId, driverId) => {
  return Orders.find({ _id: orderId })
    .then(order => {
      const { drivers } = order;

      if (drivers.findIndex(driverId) < 0) {
        drivers.push(driverId);
      }

      return edit(orderId, { drivers });
    });
};

const pickClient = orderId => {
  return setStatus(orderId, ORDER_STATUSES.ORDER_STATUS_PASSENGER_MET_DRIVER);
};

const driverArrived = orderId => {
  return setStatus(orderId, ORDER_STATUSES.ORDER_STATUS_DRIVER_ARRIVED);
};

const chooseDriver = (orderId, driverId) => {
  return edit(orderId, { driverId });
};

const chooseDrivers = (orderId, drivers) => {
  return edit(orderId, { drivers });
};

var exportObject = {
  add,
  all,
  pickOrder,
  pickClient,
  driverArrived,
  chooseDriver,
  chooseDrivers,

  clear,
  addList: saveRecursively,
  setStatus,
};

module.exports = exportObject;
