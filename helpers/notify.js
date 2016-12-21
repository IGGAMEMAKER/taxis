var Promise = require('bluebird');
var request = require('superagent');

var eventServerAddress = 'localhost:4000';

var notify = (channel, object, push) => {
  // channel / tag
  // object, which you want to transfer
  // push - boolean. Push or not if websocket send failed/did not received result

  // send it to event server and it will proxy this
  return new Promise((resolve, reject) => {
    request
      .post(eventServerAddress, { channel, object, push })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(1);
        }
      });
  });
};

module.exports = {
  notify
};
