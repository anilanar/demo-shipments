// @flow
const { authenticate } = require('@feathersjs/authentication').hooks;
const notAllowed = require('../../hooks/not-allowed');
const setAssignee = require('./hooks/set-assignee');
const setOriginal = require('./hooks/set-original');
const validateAssigned = require('./hooks/validate-assigned');
const validateAssignee = require('./hooks/validate-assignee');
const validateData = require('./hooks/validate-data');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ setAssignee() ],
    get: [ ],
    create: [ notAllowed() ],
    update: [ notAllowed() ],
    patch: [ setOriginal(), validateAssignee(), validateData() ],
    remove: [ notAllowed() ]
  },

  after: {
    all: [],
    find: [],
    get: [ validateAssigned() ],
    create: [],
    update: [],
    patch: [],
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
