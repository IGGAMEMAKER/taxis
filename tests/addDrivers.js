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
  isSmoking: 0
});

tester.post('/drivers', {
  phone: '8955555555133', name: 'Алексей Иванов',
  mark: 8,
  age: 35,
  experience: 14,
  gender: 1,
  categories: {},
  internationalLicence: 0,
  isOfficial: 1,
  isSmoking: 0
});

tester.post('/drivers', {
  phone: '8955555555134', name: 'Пётр Сидоров',
  mark: 6,
  age: 45,
  experience: 24,
  gender: 1,
  categories: {},
  internationalLicence: 1,
  isOfficial: 0,
  isSmoking: 1
});

setTimeout(() => {
  tester.get('/drivers/all');
}, 5000);
