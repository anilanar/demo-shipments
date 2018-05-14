import { createSelector } from 'reselect';

export const selectAuthentication = state => state.authentication;

export const getStatus = createSelector(
  selectAuthentication,
  auth => auth.status,
);

export const getData = createSelector(
  selectAuthentication,
  auth => auth.data,
);

export const getUser = createSelector(
  getStatus,
  getData,
  (status, data) => status === 'success' ? data : null,
);

export const getRole = createSelector(
  getUser,
  user => user && user.role,
);

export const getError = createSelector(
  getStatus,
  getData,
  (status, data) => status === 'error' ? data : null,
);

export const isAuthenticated = createSelector(
  getStatus,
  status => status === 'success',
)
