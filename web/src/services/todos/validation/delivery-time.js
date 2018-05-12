// @flow
const invariant = require('invariant');
const { assert, assertIsoTime } = require('../../../lib/validation');
const isIsoTime = require('is-iso-date');

module.exports = function validateDeliveryTime(
  data /*: Object */,
  original /*: Object */
) {
  invariant(
    data.deliveryTime !== undefined,
    'deliveryTime must not be undefined'
  );
  if (data.deliveryTime !== null) {
    assertIsoTime(
      data.deliveryTime,
      'deliveryTime must be an ISO8601 date-time string'
    );
    invariant(
      isIsoTime(original.pickupTime),
      `pickupTime in database is wrongly set:\n${JSON.stringify(original)}`
    );
    assert(
      data.deliveryTime > original.pickupTime,
      'deliveryTime must be later than pickupTime'
    );
  }
};
