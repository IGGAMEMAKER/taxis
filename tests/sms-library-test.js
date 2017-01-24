const smsSender = require('../helpers/sms-sender');

// smsSender('All Drivers', '+79165351652', 'Sms test', {});
// smsSender('All Drivers', '+46700000000', 'Hello world', {});
smsSender('All Drivers', '+46700000000', {"message":"Hello world"}, {});