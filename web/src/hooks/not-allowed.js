const Error = require('../lib/error');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.params.ignoreAuth) {
      return context;
    }
    throw new Error('not allowed', 401);
  };
};
