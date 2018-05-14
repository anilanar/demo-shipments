import { ofType } from "redux-observable";

export const forActions = (...actions) => source$ =>
  source$.pipe(
    ofType(...(actions.map(a => a.getType())))
  );
