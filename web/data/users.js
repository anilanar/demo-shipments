// @flow
const faker = require('faker');
faker.seed(1);
faker.locale = 'de';

const admin = {
  id: 0,
  name: randomName(),
  username: 'admin',
  password: 'admin',
  role: 'admin',
};

const manager = {
  id: 1,
  name: randomName(),
  username: 'manager',
  password: 'manager',
  role: 'manager'
};

const bikers = Array.from(Array(10)).map((_, idx) => ({
  id: idx + 2,
  name: randomName(),
  username: `biker${idx}`,
  password: `biker${idx}`,
  role: 'biker',
}));

module.exports = [
  admin,
  manager,
  ...bikers,
];

function randomName() {
  return faker.fake('{{name.firstName}} {{name.lastName}}');
}
