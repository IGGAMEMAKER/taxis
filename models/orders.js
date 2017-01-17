var db = require('../helpers/db');
var Orders = db.wrap('Orders');

var logger = require('../helpers/logger');

var add = (object) => {
  return Orders.save(object);
};

var saveRecursively = (list, index, responses) => {
  if (index < list.length) {
    return Orders.save(list[index])
      .then(r => {
        responses.push(r);

        return saveRecursively(list, index + 1, responses);
      });
  }

  // logger.log('saveRecursively result' + JSON.stringify(responses));
  return { status: 'ok', responses };
};

var all = () => {
  return Orders.list({});
};

var clear = () => {
  return Orders.remove({});
};

var setStatus = (orderId, status) => {
  return Orders.update({ _id: orderId }, { status });
};

var exportObject = {
  add,
  all,

  clear,
  addList: saveRecursively,
  setStatus,
};

module.exports = exportObject;
