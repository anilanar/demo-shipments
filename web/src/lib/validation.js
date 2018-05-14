// @flow

const errors = require('@feathersjs/errors');
const isIsoDate = require('is-iso-date');

const assert = exports.assert = function assert(
  condition /*: boolean */,
  msg /*: ?string */
) {
  if (!condition) {
    throw new errors.BadRequest(msg);
  }
};

exports.assertIsoTime = function assertIsoTime(
  time /*: any */,
  msg /*: ?string */
) {
  assert(
    typeof time === 'string' && isIsoDate(time),
    msg,
  );
};
