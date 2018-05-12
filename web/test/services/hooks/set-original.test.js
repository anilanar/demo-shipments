const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const setOriginal = require('../../../src/services/todos/hooks/set-original');

describe('\'todos::set-original\' hook', () => {
  let app;
  const theShipment = { id: 1 };

  beforeEach(() => {
    app = feathers();

    app.use('/shipments', {
      async get(id) {
        assert(id, 1);
        return theShipment;
      }
    });

    app.use('/todos', {
      async patch(id, data, params) {
        return { id, original: params.original };
      }
    });

    app.service('todos').hooks({
      before: {
        patch: [ setOriginal() ]
      }
    });
  });

  it('sets query.assignee to user.id', async () => {
    const { id, original } = await app.service('todos').patch(1, {}, {});
    assert.equal(id, 1);
    assert.equal(original, theShipment);
  });
});
