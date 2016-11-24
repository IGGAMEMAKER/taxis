var db = require('../helpers/db');
var Drivers = db.wrap('Drivers');

var add = (object) => {
  return Drivers.save(object);
};

var exportObject = {
  add
};

module.exports = exportObject;
