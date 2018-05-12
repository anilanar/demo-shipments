import { createReducer } from 'redux-act';
import * as A from './actions';

const defaultState = null;

export default createReducer({
  [A.authenticateRequest]: () => 'loading',
  [A.authenticateSuccess]: (user) => user,
  [A.authenticateFailure]: (error) => error,
}, defaultState);
