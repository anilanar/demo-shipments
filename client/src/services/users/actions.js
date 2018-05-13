import { createAction } from "redux-act";

export const loadUsersRequest = createAction('LOAD_USERS_REQUEST');

export const loadUsersSuccess = createAction(
  'LOAD_USERS_SUCCESS',
  (ids, entities) => ({ ids, entities }),
);

export const loadUsersFailure = createAction('LOAD_USERS_FAILURE');
