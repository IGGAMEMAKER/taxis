var db = require('../helpers/db');
var UserPreferences = db.wrap('UserPreferences');

var logger = require('../helpers/logger');

var add = preference => {
  var userId = preference.userId;
  var driverId = preference.driverId;
  var changes = {};

  return UserPreferences.find({ userId, driverId })
    .then(p => {
      logger.debug('add preference', preference, p);
      if (p) {
        if (preference.mark) {
          changes.mark = preference.mark;
        }

        if (preference.comment) {
          changes.comment = preference.comment;
        }

        return UserPreferences.update({ userId, driverId }, changes);
      }

      return UserPreferences.save(preference);
    });
};

var getByUserId = userId => {
  return UserPreferences.find({ userId });
};

var getByDriverId = driverId => {
  return UserPreferences.find({ driverId });
};

var clear = () => {
  return UserPreferences.remove({});
};

var all = () => {
  return UserPreferences.list({});
};

var exportObject = {
  add,
  all,
  clear,

  getByUserId,
  getByDriverId
};

module.exports = exportObject;
