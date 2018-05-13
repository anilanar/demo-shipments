// @flow
const { isArray } = require('lodash');

module.exports = {
  before: function fillAssigneesBeforeHook() {
    return context => {
      const { params } = context;
      if (params.query.fill_assignees) {
        params.fillAssignees = true;
        delete params.query.fill_assignees;
      }
      return context;
    };
  },
  after: function fillAssigneesAfterHook() {
    return async (context) => {
      const { params, result } = context;
      if (!params.fillAssignees) {
        return context;
      }
      const shipments = isArray(result) ? result : [result];
      await setAssignees(context, shipments);

      return context;
    };
  },
};

/**
 * Mutates shipments by replacign assignees with actual user objects.
 * @param {Context} context feathers hook context
 * @param {Array} shipments array of shipments
 */
const setAssignees = async ({ app, params }, shipments) => {
  const assignedShipments = shipments.filter(s => s.assignee !== null);

  const users = app.service('users');
  const assigneeUsers = await users.find({
    ...params,
    query: {
      id: { $in: assignedShipments.map(s => s.assignee) },
    },
  });

  const usersById = assigneeUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  assignedShipments.forEach(s => s.assignee = usersById[s.assignee]);
};
