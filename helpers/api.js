var api;
var users = require('../models/users');
var orders = require('../models/orders');
var drivers = require('../models/drivers');

api = {
  users,
  orders,
};


module.exports = api;
