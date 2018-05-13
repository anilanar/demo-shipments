const { authenticate } = require('@feathersjs/authentication').hooks;
const notAllowed = require('../../hooks/not-allowed');
const fillAssignees = require('./hooks/fill-assignees');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ fillAssignees.before() ],
    get: [ fillAssignees.before() ],
    create: [ notAllowed() ],
    update: [ notAllowed() ],
    patch: [ fillAssignees.before() ],
    remove: [ notAllowed() ]
  },

  after: {
    all: [],
    find: [ fillAssignees.after() ],
    get: [ fillAssignees.after() ],
    create: [],
    update: [],
    patch: [ fillAssignees.after() ],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
