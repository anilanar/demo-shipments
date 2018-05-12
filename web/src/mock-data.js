// @flow

const mockUsers = require('../data/users');
const mockShipments = require('../data/shipments');

module.exports = function (app /*: * */) {
  const users = app.service('users');
  mockUsers.forEach(u => users.create(u));

  const shipments = app.service('shipments');
  mockShipments.forEach(s => shipments.create(s, { ignoreAuth: true }));
};
