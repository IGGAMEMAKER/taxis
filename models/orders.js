var db = require('../helpers/db');
var Orders = db.wrap('Orders');

var add = (object) => {
  return Orders.save(object);
};

var exportObject = {
  add
};

module.exports = exportObject;
