var request = require('superagent');
var orderServerAddress = 'localhost:4001';
var Promise = require('bluebird');


var requestPromisify = (address, url, data) => {
  return new Promise((resolve, reject) => {
    request
      .post(address + url, data)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
};

module.exports = {
  orderServer: (url, data) => requestPromisify(orderServerAddress, url, data)
};
