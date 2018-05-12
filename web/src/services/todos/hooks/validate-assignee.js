// @flow
const errors = require('@feathersjs/errors');
const invariant = require('invariant');

/*::
type Context = {
  id: number,
  params: {
    original?: {
      assignee?: number
    },
    user?: {
      id: number
    }
  }
};
*/

/**
 * Validates whether the the original shipment (params.original) is assigned
 * to the currently logged in user.
 */
module.exports = function validateAssignee() {
  return (context /*: Context */) => {
    const { original, user } = context.params;

    invariant(user, 'a user must be logged in');
    invariant(typeof user.id === 'number', 'user id must be a number');
    invariant(original, 'params.original must be assigned');

    if (original.assignee !== user.id ) {
      throw new errors.Forbidden('The shipment is not assigned to the user', {
        shipmentId: context.id,
        userId: user.id
      });
    }
    return context;
  };
};
