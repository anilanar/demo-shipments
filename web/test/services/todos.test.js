const assert = require('assert');
const app = require('../../src/app');

describe('\'todos\' service', () => {
  let service;
  let user;

  beforeEach(async () => {
    service = app.service('todos');

    const users = app.service('users');
    user = await users.get(0);
  });

  it('registered the service', () => {
    assert.ok(service);
  });

  it('finds todo items', async () => {
    const todos = await service.find({ user, query: {} });
    console.log(todos);
  });
});
