var db = require('../helpers/db');
var Users = db.wrap('Users');

var add = (phone, name) => {
  return Users.find({ phone })
    .then(u => {
      if (u) throw 'alreadyExists';

      return Users.save({ phone, name });
    });
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
  update
};

module.exports = exportObject;
