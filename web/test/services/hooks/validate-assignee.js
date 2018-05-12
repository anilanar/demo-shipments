const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const errors = require('@feathersjs/errors');
const validateAssignee = require('../../../src/services/todos/hooks/validate-assignee');

describe('\'todos::validate-assignee\' hook', () => {
  let app;
  const user = {
    id: 1,
  };
  const patchData = {
    foo: 'bar'
  };

  beforeEach(() => {
    app = feathers();

    app.use('/todos', {
      async patch() {}
    });

    app.service('todos').hooks({
      before: {
        patch: [ validateAssignee() ]
      }
    });
  });

  it('works if assigned to current user', async () => {
    const original = { assignee: user.id };
    await app.service('todos').patch(0, patchData, { user, original });
  });

  it('throws Forbidden if original is not assigned to anyone', async () => {
    try {
      const original = { assignee: null };
      await app.service('todos').patch(0, patchData, { user, original });
      assert.fail();
    } catch (e) {
      assert.ok(e instanceof errors.Forbidden);
    }
  });

  it('throws Forbidden if original is assigned to someone else', async () => {
    try {
      const original = { assignee: 2 };
      await app.service('todos').patch(0, patchData, { user, original });
      assert.fail();
    } catch (e) {
      assert.ok(e instanceof errors.Forbidden);
    }
  });

  it('fails if original does not exist', async () => {
    try {
      await app.service('todos').patch(0, patchData, { user });
      assert.fail();
    } catch (e) {
      assert.ok(true);
    }
  });
});
