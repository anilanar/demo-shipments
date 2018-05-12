const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const setAssignee = require('../../../src/services/todos/hooks/set-assignee');

describe('\'todos::set-assignee\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/todos', {
      async find(params) {
        return { assignee: params.query.assignee };
      }
    });

    app.service('todos').hooks({
      before: {
        find: [ setAssignee() ]
      }
    });
  });

  it('sets query.assignee to user.id', async () => {
    const { assignee } = await app.service('todos').find({
      user: { id: 1 },
      query: {}
    });
    assert.equal(assignee, 1);
  });
});
