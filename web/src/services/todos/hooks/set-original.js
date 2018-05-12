// @flow

/*::
type Context = {
  app: any,
  id?: number,
  params: {
    original?: Object
  }
};
*/

/**
 * Sets params.original to the database entity that is currently being patched.
 */
module.exports = function setOriginal() {
  return async (context /*: Context */) => {
    const shipments = context.app.service('shipments');
    context.params.original = await shipments.get(context.id, context.params);
    return context;
  };
};
