const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const errors = require('@feathersjs/errors');
const validateAssigned = require('../../../src/services/todos/hooks/validate-assigned');

describe('\'todos::validate-assigned\' hook', () => {
  let app;
  let shipment;
  const user = {
    id: 1,
  };

  beforeEach(() => {
    app = feathers();
    shipment = undefined;

    app.use('/todos', {
      async get() {
        return shipment;
      }
    });

    app.service('todos').hooks({
      after: {
        get: [ validateAssigned() ]
      }
    });
  });

  it('works if assigned to current user', async () => {
    shipment = { assignee: 1 };
    const result = await app.service('todos').get(0, { user });
    assert.equal(result, shipment);
  });

  it('throws Forbidden if todo item is not assigned to anyone', async () => {
    try {
      shipment = { assignee: null };
      await app.service('todos').get(0, { user });
      assert.fail();
    } catch (e) {
      assert.ok(e instanceof errors.Forbidden);
    }
  });

  it('throws Forbidden if todo item is assigned to someone else', async () => {
    try {
      shipment = { assignee: 2 };
      await app.service('todos').get(0, { user });
      assert.fail();
    } catch (e) {
      assert.ok(e instanceof errors.Forbidden);
    }
  });
});
