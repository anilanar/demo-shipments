import { createReducer } from 'redux-act';
import * as A from './actions';

const defaultState = {
  status: 'logged_out',
};

export default createReducer({
  [A.authenticateRequest]: (_, { username }) => ({
    status: 'loading',
    data: { username },
  }),
  [A.authenticateSuccess]: (_, { user }) => ({
    status: 'success',
    data: user,
  }),
  [A.authenticateFailure]: () => ({
    status: 'failure',
    data: null,
  }),
  [A.logout]: () => ({
    status: 'logged_out',
    data: null,
  }),
}, defaultState);
