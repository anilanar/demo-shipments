// @flow
const validatePickupTime = require('../validation/pickup-time');
const validateDeliveryTime = require('../validation/delivery-time');
const { assert } = require('../../../lib/validation');

/*::
type Context = {
  data: any,
  params: {
    original: any
  }
};
*/

/**
 * Validates whether the patch data is a valid object. It must patch either
 * `pickupTime` or `deliveryTime` but not both.
 */
module.exports = function validateData() {
  return async (context /*: Context */) => {
    const { data, params } = context;
    const { original } = params;

    // simplify validation by allowing one property update at a time
    assert(
      Object.keys(data).length === 1,
      'cannot update more than 1 propety at a time'
    );

    if ('pickupTime' in data) {
      validatePickupTime(data, original);
    }
    else if ('deliveryTime' in data) {
      validateDeliveryTime(data, original);
    }
    else {
      assert(
        false,
        'can patch pickupTime and deliveryTime only'
      );
    }
    return context;
  };
};
