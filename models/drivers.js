var db = require('../helpers/db');
var Drivers = db.wrap('Drivers');

var add = (object) => {
  return Drivers.save(object);
};

var all = () => {
  return Drivers.find({});
};

var exportObject = {
  add,
  all
};

module.exports = exportObject;
