import { createReducer } from 'redux-act';

import * as A from './actions';

const defaultState = {
  ids: [],
  entities: {
    users: {},
  },
  status: {
    load: null,
  },
};

export default createReducer({
  [A.loadUsersRequest]: state => ({
    ...state,
    status: {
      ...state.status,
      load: 'loading',
    },
  }),
  [A.loadUsersSuccess]: (state, { ids, entities }) => ({
    ...state,
    ids,
    entities,
    status: {
      ...state.status,
      load: 'success,',
    },
  }),
  [A.loadUsersFailure]: state => ({
    ...state,
    status: {
      ...state.status,
      load: 'failure',
    },
  }),
}, defaultState);
