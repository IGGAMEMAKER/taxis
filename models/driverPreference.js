var db = require('../helpers/db');
var DriverPreferences = db.wrap('DriverPreferences');

var logger = require('../helpers/logger');

var add = preference => {
  var userId = preference.userId;
  var driverId = preference.driverId;
  var changes = {};

  return DriverPreferences.find({ userId, driverId })
    .then(p => {
      logger.debug('add preference', preference, p);
      if (p) {
        if (preference.mark) {
          changes.mark = preference.mark;
        }

        if (preference.comment) {
          changes.comment = preference.comment;
        }

        return DriverPreferences.update({ userId, driverId }, changes);
      }

      return DriverPreferences.save(preference);
    });
};

var getByUserId = userId => {
  return DriverPreferences.find({ userId });
};

var getByDriverId = driverId => {
  return DriverPreferences.find({ driverId });
};

var clear = () => {
  return DriverPreferences.remove({});
};

var all = () => {
  return DriverPreferences.list({});
};

var exportObject = {
  add,
  all,
  clear,

  getByUserId,
  getByDriverId
};

module.exports = exportObject;
