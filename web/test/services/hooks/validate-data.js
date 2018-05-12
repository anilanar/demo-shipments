const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const errors = require('@feathersjs/errors');
const validateData = require('../../../src/services/todos/hooks/validate-data');

describe('\'todos::validate-data\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/todos', {
      async patch() {}
    });

    app.service('todos').hooks({
      before: {
        patch: [ validateData() ]
      }
    });
  });

  it('sets pickup time', async () => {
    const original = {
      pickupTime: null,
      deliveryTime: null,
    };
    const data = {
      pickupTime: '2018-01-01T00:00Z'
    };
    await app.service('todos').patch(0, data, { original });
  });

  it('sets pickup time even if original is already set', async () => {
    const original = {
      pickupTime: '2018-01-01T00:00Z',
      deliveryTime: '2018-01-01T01:00Z',
    };
    const data = {
      pickupTime: '2018-01-01T00:30Z'
    };
    await app.service('todos').patch(0, data, { original });
  });

  it('unsets pickup time', async () => {
    const original = {
      pickupTime: '2018-01-01T00:00Z',
      deliveryTime: null,
    };
    const data = {
      pickupTime: null,
    };
    await app.service('todos').patch(0, data, { original });
  });

  it('sets delivery time', async () => {
    const original = {
      pickupTime: '2018-01-01T00:00Z',
      deliveryTime: null,
    };
    const data = {
      deliveryTime: '2018-01-01T01:00Z',
    };
    await app.service('todos').patch(0, data, { original });
  });

  it('sets delivery time if original is already set', async () => {
    const original = {
      pickupTime: '2018-01-01T00:00Z',
      deliveryTime: '2018-01-01T01:00Z',
    };
    const data = {
      deliveryTime: '2018-01-01T01:30Z',
    };
    await app.service('todos').patch(0, data, { original });
  });

  it('unsets delivery time', async () => {
    const original = {
      pickupTime: '2018-01-01T00:00Z',
      deliveryTime: '2018-01-01T01:00Z',
    };
    const data = {
      deliveryTime: null,
    };
    await app.service('todos').patch(0, data, { original });
  });

  it('throws BadRequest if pickupTime and delivery time are set at the same time', async () => {
    try {
      const original = {
        pickupTime: null,
        deliveryTime: null,
      };
      const data = {
        pickupTime: '2018-01-01T00:00Z',
        deliveryTime: '2018-01-01T01:00Z',
      };
      await app.service('todos').patch(0, data, { original });
      assert.fail();
    } catch (e) {
      assert.ok(e instanceof errors.BadRequest, 'must throw BadRequest error');
    }
  });

  it('throws BadRequest if unsetting pickup time when delivery time is set', async () => {
    try {
      const original = {
        pickupTime: '2018-01-01T00:00Z',
        deliveryTime: '2018-01-01T01:00Z',
      };
      const data = {
        pickupTime: null,
      };
      await app.service('todos').patch(0, data, { original });
      assert.fail();
    } catch (e) {
      assert.ok(e instanceof errors.BadRequest, 'must throw BadRequest error');
    }
  });

  it('throws BadRequest if setting pickupTime to a time that is after delivery time', async () => {
    try {
      const original = {
        pickupTime: '2018-01-01T00:00Z',
        deliveryTime: '2018-01-01T01:00Z',
      };
      const data = {
        pickupTime: '2018-01-01T02:00Z',
      };
      await app.service('todos').patch(0, data, { original });
      assert.fail();
    } catch (e) {
      assert.ok(e instanceof errors.BadRequest, 'must throw BadRequest error');
    }
  });

  it('throws BadRequest if setting delivery time to a time that is before pickup time', async () => {
    try {
      const original = {
        pickupTime: '2018-01-01T01:00Z',
        deliveryTime: null,
      };
      const data = {
        deliveryTime: '2018-01-01T00:00Z',
      };
      await app.service('todos').patch(0, data, { original });
      assert.fail();
    } catch (e) {
      assert.ok(e instanceof errors.BadRequest, 'must throw BadRequest error');
    }
  });

});
