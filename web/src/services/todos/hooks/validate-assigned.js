// @flow
const errors = require('@feathersjs/errors');
const invariant = require('invariant');

/*::
type Context = {
  params: {
    user?: {
      id: number
    }
  },
  result: ?{
    id?: mixed,
    assignee?: mixed
  }
};
*/

/**
 * After a get event, validates if the todo item for a given id is assigned to
 * the * user.
 */
module.exports = function validateAssigned() {
  return (context /*: Context*/) => {
    invariant(context.params.user, 'a user must be logged in');
    invariant(typeof context.params.user.id === 'number', 'user id must be a number');

    const userId = context.params.user.id;
    if (context.result && context.result.assignee !== userId) {
      throw new errors.Forbidden('The shipment is not assigned to the user', {
        shipmentId: context.result.id,
        userId,
      });
    }
    return context;
  };
};
