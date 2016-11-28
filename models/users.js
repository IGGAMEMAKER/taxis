var db = require('../helpers/db');
var Users = db.wrap('Users');

var add = (phone, name) => {
  return Users.find({ phone })
    .then(u => {
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

var exportObject = {
  add,
  all,
  update,
  clear,
  getByPhone
};

module.exports = exportObject;
