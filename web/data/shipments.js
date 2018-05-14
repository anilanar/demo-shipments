// @flow
const faker = require('faker');
faker.seed(1);
faker.locale = 'de';

/*::
type Shipment = {
  id: number,
  origin: string,
  destination: string,
  assignee: ?number,
  pickupTime: ?string,
  deliveryTime: ?string,
};
*/

module.exports = (Array.from(Array(50)).map((_, idx) => {
  const assignee = faker.random.number(3) === 1
    ? faker.random.number({ min: 2, max: 11 })
    : null;
  const pickupTime = assignee && faker.random.number(2) === 1
    ? faker.date.recent().toISOString()
    : null;
  const deliveryTime = pickupTime && faker.random.number(2) === 1
    ? faker.date.between(pickupTime, faker.date.future(0.2)).toISOString()
    : null;

  return {
    id: idx,
    origin: faker.fake('{{address.streetAddress}}'),
    destination: faker.fake('{{address.streetAddress}}'),
    assignee,
    pickupTime,
    deliveryTime,
  };
}) /*: Shipment[] */);
