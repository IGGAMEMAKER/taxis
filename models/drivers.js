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

var exportObject = {
  add,
  all,
  clear,
  openSession,
  closeSession,
  getByDriverId
};

module.exports = exportObject;
