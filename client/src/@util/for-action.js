import { ofType } from "redux-observable";

/**
 * Similar to redux-observable/ofType, but for redux-act actions.
 */
export const forActions = (...actions) => source$ =>
  source$.pipe(
    ofType(...(actions.map(a => a.getType())))
  );
