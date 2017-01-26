const configs = require('../configs');

const request = require('superagent');

const smsApiKey = configs.smsApiKey;
const smsApiSecret = configs.smsApiSecret;
// const smsApiKey = '5F5C418A0F914BBC8234A9BF5EDDAD97';
// const smsApiSecret = 'JViE5vDor0Sw3WllZka15Q==';

const smsApiId = configs.smsApiId;


// const sinchSms = require('sinch-sms')({
//   key: smsApiKey,
//   secret: smsApiSecret
// });

const Promise = require('bluebird');

const logger = require('../helpers/logger');

// const parseToUTF8 = (myString) => JSON.parse(JSON.stringify(myString));
const parseToUTF8 = (myString) => JSON.stringify(myString);
// 143460337
const send = (sender, recipient, message, options) => {
  // return sinchSms.send(recipient, message)
  //   .then(result => {
  //     logger.log('SMS Response', result);
  //     return result;
  //   })
  //   .catch(err => {
  //     logger.log('SMS Error', err);
  //   });
};

const check = (messageId) => {
  // return sinchSms.getStatus(messageId)
  //   .then(result => {
  //     logger.log('SMS GET STATUS RESPONSE', result);
  //     return result;
  //   })
  //   .catch(err => {
  //     logger.log('SMS GET STATUS Error', err);
  //   });
};

const cycleGettingStatus = (messageId, period) => {
  check(messageId);
  setTimeout(() => {
    cycleGettingStatus(messageId, period);
  }, period);
};

const pend = (sender, recipient, message, options) => {
  let messageId;
  send(sender, recipient, message, options)
    .then(result => {
      messageId = result.messageId;

      cycleGettingStatus(messageId, 1000);
    });
}

const send2 = (sender, recipient, message, options) => {
  return request
    .get(`http://sms.ru/sms/send\?api_id=${smsApiId}&to=${recipient}&text=${message}`)
    // .send({ from: sender || 'Трезвый водитель', message })
    .then(r => r)
    .catch(err => { throw err; });
  // curl -d "text=hello world привет мир" http://sms.ru/sms/send\?api_id=028441D8-E861-5AD5-6295-8436EBC4CD9D\&to=+79648847260
}

module.exports = {
  send: send2,
  check,
  pend
};

  // const body = message;
  // const ContentMD5 = crypto.createHash('md5').update(parseToUTF8(body)).digest('base64');
  // // const ContentMD5 = 'jANzQ+rgAHyf1MWQFSwvYw==';
  // logger.log('ContentMD5')
  // logger.log('\t', ContentMD5, ContentMD5 === 'jANzQ+rgAHyf1MWQFSwvYw==' ? 'correct' : 'incorrect');
  //
  // // const xTimestamp = new Date();
  // const xTimestamp = '2014-06-04T13:41:58Z';
  // const timestamp = `x-timestamp:${xTimestamp}`;
  // const contentType = 'application/json';
  // const StringToSign = `POST\n${ContentMD5}\n${contentType}\n${timestamp}\n/v1/sms/${recipient}`;
  // logger.log('StringToSign')
  // logger.log('\t', StringToSign);
  //
  // // const secret = smsApiSecret;
  // // const secret = 'SlZpRTV2RG9yMFN3M1dsbFprYTE1UT09';
  // const secret = 'JViE5vDor0Sw3WllZka15Q==';
  // // const secret = 'SlZpRTV2RG9yMFN3M1dsbFprYTE1UT09';
  // const Signature = crypto.createHmac('sha256', secret)
  //   .update(StringToSign)
  //   .digest('base64');
  // logger.log('Signature')
  // logger.log('\t', Signature);
  //
  // const Authorization = `Application ${smsApiKey}:${Signature}`;
  // logger.log('Authorization')
  // logger.log('\t', Authorization);
  // // SlZpRTV2RG9yMFN3M1dsbFprYTE1UT09
  //
  // // const ANSWER =
  //
  // // return request
  // //   .post(`https://messagingapi.sinch.com/v1/Sms/${recipient}`)
  // //   .send({ from: sender || 'Трезвый водитель', message })
  // //   .set('Authorization', Authorization)
  // //   .set('X-Timestamp', xTimestamp)
  // //   .set('Content-Type', contentType)
  // //   .then(r => r)
  // //   .catch(err => { throw err; });
// };
