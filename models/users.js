var db = require('../helpers/db');
var Users = db.wrap('Users');

var logger = require('../helpers/logger');

var add = (phone, name) => {
  return Users.find({ phone })
    .then(u => {
      logger.log('model add phone name', phone, name, u);
      if (u) throw 'alreadyExists';

      return Users.save({ phone, name });
    });
};

var getByPhone = (phone) => {
  return Users.find({ phone });
};

var clear = () => {
  return Users.remove({});
};

var update = (phone, changes) => {
  return Users.update({ phone }, changes);
};

var all = () => {
  return Users.list({});
};

var find = (phone) => {
  return Users.find({ phone });
};

var editFavouriteAddresses = (addresses, phone) => {
  return Users.update({ phone }, { addresses });
};

var getOrSave = (phone) => {
  return Users.find({ phone })
    .then(u => {
      if (!u) {
        return Users.save({ phone });
      }

      return u;
    });
};

var exportObject = {
  add,
  all,
  find,
  update,
  clear,
  getByPhone,
  getOrSave,
  editFavouriteAddresses
};

module.exports = exportObject;
