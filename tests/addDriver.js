var tester = require('../helpers/tester');

tester.post('/drivers', {
  phone: '8955555555132', name: 'Алексей Доронин',
  mark: 7,
  age: 25,
  experience: 4,
  gender: 1,
  categories: {},
  internationalLicence: 1,
  isOfficial: 1,
  isSmoking: 0,
  isSessionOpened: 1
});
// .then(r => {
//   console.log('result', r);
// });