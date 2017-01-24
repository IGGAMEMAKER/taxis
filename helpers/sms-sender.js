const configs = require('../configs');

const { smsApiKey, smsApiSecret } = configs;

const Promise = require('bluebird');

const logger = require('../helpers/logger');

const request = require('superagent');

const crypto = require('crypto');

const parseToUTF8 = (string) => string;

module.exports = (sender, recipient, message, options) => {
  const body = message;
  const ContentMD5 = crypto.createHash('md5').update(parseToUTF8(body)).digest('base64');

  const xTimestamp = new Date();
  const timeStampString = `x-timestamp:${xTimestamp}`;
  const StringToSign = `POST\n${ContentMD5}\napplication/json\n${timeStampString}\n/v1/sms/${recipient}`;
  logger.log('StringToSign', StringToSign);

  const secret = smsApiSecret;
  const Signature = crypto.createHmac('sha256', secret)
    .update(parseToUTF8(StringToSign))
    .digest('base64');

  const Authorization = `Application ${smsApiKey}:${Signature}`;

  return request
    .post(`https://messagingapi.sinch.com/v1/Sms/${recipient}`)
    .send({ from: sender || 'Трезвый водитель', message })
    .set('Authorization', Authorization)
    .then(r => r)
    .catch(err => { throw err; });
};
