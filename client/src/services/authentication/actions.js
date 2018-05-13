import { createAction } from 'redux-act';

export const authenticateRequest = createAction(
  'AUTHENTICATE_REQUEST',
  (username, password) => ({ username, password, }),
);

export const authenticateSuccess = createAction(
  'AUTHENTICATE_SUCCESS',
  user => ({ user }),
);

export const authenticateFailure = createAction(
  'AUTHENTICATE_FAILURE',
  error => ({ error }),
);

export const logout = createAction('LOGOUT');

export const checkAuthentication = createAction('CHECK_AUTHENTICATION');
