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

var exportObject = {
  add,
  all,
  openSession,
  closeSession
};

module.exports = exportObject;
