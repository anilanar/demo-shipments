// const errors = require('@feathersjs/errors');
const hooks = require('./todos.hooks');

module.exports = function (app) {

  const shipments = app.service('shipments');
  // app.use('/todos', {
  //   async get(id, params) {
  //     const todo = await shipments.get(id, {
  //       ...params,
  //       assignee: params.user.id,
  //     });
  //     return todo;
  //   },
  //   async find(params) {
  //     const todos = await shipments.find({
  //       ...params,
  //       query: {
  //         ...params.query,
  //         assignee: params.user.id,
  //       },
  //     });
  //     return todos;
  //   },
  //   async patch(id, data, params) {
  //     const todo = await service.get(id, params);
  //     if (!todo.pickupTime && data.deliveryTime) {
  //       throw 'not allowed';
  //     }
  //     if (todo.pickupTime && )
  //     await shipments.patch(id, data, params);
  //   }
  // });

  app.use('/todos', {
    find(...args) { return shipments.find(...args); },
    get(...args) { return shipments.get(...args); },
    patch(...args) { return shipments.patch(...args); },
  });

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('todos');

  service.hooks(hooks);
};
