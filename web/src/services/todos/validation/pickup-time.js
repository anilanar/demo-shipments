// @flow

const invariant = require('invariant');
const { assert, assertIsoTime } = require('../../../lib/validation');
const isIsoTime = require('is-iso-date');

module.exports = function validatePickupTime(
  data /*: Object */,
  original /*: Object */
) {
  if (data.pickupTime !== null) {
    assertIsoTime(
      data.pickupTime,
      'pickupTime must be an ISO8601 datetime string'
    );
    if (original.deliveryTime !== null) {
      invariant(
        isIsoTime(original.deliveryTime),
        `deliveryTime in database is wrongly formatted:\n${JSON.stringify(original)}`,
      );
      assert(
        data.pickupTime < original.deliveryTime,
        'pickupTime must be earlier than deliveryTime'
      );
    }
  }
  else if (data.pickupTime === null) {
    assert(
      original.deliveryTime === null,
      'cannot set pickupTime to null when deliveryTime is set'
    );
  }
};
