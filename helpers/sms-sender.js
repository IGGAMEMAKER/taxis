const configs = require('../configs');

// const smsApiKey = configs.smsApiKey;
// const smsApiSecret = configs.smsApiSecret;
const smsApiKey = '5F5C418A0F914BBC8234A9BF5EDDAD97';
const smsApiSecret = 'JViE5vDor0Sw3WllZka15Q==';


const Promise = require('bluebird');

const logger = require('../helpers/logger');

const request = require('superagent');

const crypto = require('crypto');

// const parseToUTF8 = (myString) => JSON.parse(JSON.stringify(myString));
const parseToUTF8 = (myString) => JSON.stringify(myString);

module.exports = (sender, recipient, message, options) => {
  const body = message;
  const ContentMD5 = crypto.createHash('md5').update(parseToUTF8(body)).digest('base64');
  // const ContentMD5 = 'jANzQ+rgAHyf1MWQFSwvYw==';
  logger.log('ContentMD5')
  logger.log('\t', ContentMD5);

  // const xTimestamp = new Date();
  const xTimestamp = '2014-06-04T13:41:58Z';
  const timestamp = `x-timestamp:${xTimestamp}`;
  const contentType = 'application/json';
  const StringToSign = `POST\n${ContentMD5}\n${contentType}\n${timestamp}\n/v1/sms/${recipient}`;
  logger.log('StringToSign')
  logger.log('\t', StringToSign);

  const secret = smsApiSecret;
  // const secret = 'SlZpRTV2RG9yMFN3M1dsbFprYTE1UT09';
  const Signature = crypto.createHmac('sha256', secret)
    .update(parseToUTF8(StringToSign))
    .digest('base64');
  logger.log('Signature')
  logger.log('\t', Signature);

  const Authorization = `Application ${smsApiKey}:${Signature}`;
  logger.log('Authorization')
  logger.log('\t', Authorization);

  // return request
  //   .post(`https://messagingapi.sinch.com/v1/Sms/${recipient}`)
  //   .send({ from: sender || 'Трезвый водитель', message })
  //   .set('Authorization', Authorization)
  //   .set('X-Timestamp', xTimestamp)
  //   .set('Content-Type', contentType)
  //   .then(r => r)
  //   .catch(err => { throw err; });
};
