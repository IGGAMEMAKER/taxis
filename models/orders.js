var db = require('../helpers/db');
var Orders = db.wrap('Orders');

var add = (object) => {
  return Orders.save(object);
};

var saveRecursively = (list, index, responses) => {
  // if (!responses) responses = [];

  if (index < list.length) {
    return Orders.save(list[index])
      .then(r => {
        responses.push(r);

        return saveRecursively(list, index++, responses);
      });
  }

  return { msg: 1, responses };
};

var exportObject = {
  add,
  addList: saveRecursively
};

module.exports = exportObject;
