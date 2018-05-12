// @flow
const invariant = require('invariant');

/*::
type Input = {
  params: {
    user?: {
      id: number
    },
    query: {
      assignee?: number
    }
  },
};
*/

/**
 * Sets query assignee so that only shipments assigned to currently logged in
 * user * are returned.
 */
module.exports = function setAssignee() {
  return (context /*: Input */) => {
    invariant(context.params.user, 'a user must be logged in');
    invariant(typeof context.params.user.id === 'number', 'user id must be a number');

    const userId = context.params.user.id;
    context.params.query.assignee = userId;
    return context;
  };
};
