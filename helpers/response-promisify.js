// var response = require('./response');

// var error = response.error;
// var respond = response.respond;

var logger = require('../helpers/logger');

module.exports = (responseFunction, tag) => {
  return [
    (req, res, next) => {
      var promise = responseFunction(req);

      promise
        .then(data => {
          req.data = data;
          next();
        })
        .catch(next);
    },

    (req, res) => {
      res.json({ msg: req.data });
    },
    (err, req, res, next) => {
      logger.error('responsePromisify ERROR in ' + req.url, err);
      res.json({ err: err });

      next(err);
    }
  ];
};

// module.exports = promise => (req, res) => {
//   promise
//     .then(respond(res))
//     .catch(error('', res));
// };

// promisify =

// promisify(req => {
//   return api.orders.all()
// })
