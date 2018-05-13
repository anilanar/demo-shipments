// Initializes the `shipments` service on path `/shipments`
const createService = require('feathers-memory');
const hooks = require('./shipments.hooks');

module.exports = function (app) {

  // Initialize our service with any options it requires
  app.use('/shipments', createService());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('shipments');

  service.hooks(hooks);
};
