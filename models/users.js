var db = require('../helpers/db');
var Users = db.wrap('Users');

var add = (phone, name) => {
  return Users.find({ phone })
    .then(u => {
      if (u) throw 'alreadyExists';

      return Users.save({ phone, name });
    });
};

var exportObject = {
  add
};

module.exports = exportObject;
