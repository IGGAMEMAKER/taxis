var db = require('../helpers/db');
var Drivers = db.wrap('Drivers');

var add = (object) => {
  return Drivers.save(object);
};

var all = () => {
  return Drivers.list({});
};

var openSession = (phone) => {
  return Drivers.update({ phone }, { isSessionOpened: true });
};

var closeSession = (phone) => {
  return Drivers.update({ phone }, { isSessionOpened: false });
};

var getByDriverId = (phone) => {
  return Drivers.find({ phone });
};

var clear = () => {
  return Drivers.remove({});
};

// driverId
const edit = (phone, changes) => {
  return Drivers.update({ phone }, changes);
};

var exportObject = {
  add,
  all,
  edit,
  clear,
  openSession,
  closeSession,
  getByDriverId
};

module.exports = exportObject;
