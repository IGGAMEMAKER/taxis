const smsSender = require('../helpers/sms-sender');

// smsSender('All Drivers', '+79165351652', 'Sms test', {});
smsSender.pend('All Drivers', '+79165351652', 'Hello world', {});
// smsSender.check(143461856);
// smsSender('All Drivers', '+46700000000', {"message":"Hello world"}, {});