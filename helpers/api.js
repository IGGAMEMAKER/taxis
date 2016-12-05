var api;

var users = require('../models/users');
var orders = require('../models/orders');
var drivers = require('../models/drivers');
var userPreferences = require('../models/userPreferences');
var driverPreference = require('../models/driverPreference');

api = {
  users,
  orders,
  drivers,
  userPreferences,
  driverPreference
};

module.exports = api;
