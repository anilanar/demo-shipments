import { createReducer } from 'redux-act';
import merge from 'lodash/merge';

import * as A from './actions';

const defaultState = {
  ids: [],
  entities: {
    todos: {},
  },
  status: {
    load: null,
    update: null,
  },
};

const updateRequest = state => ({
  ...state,
  status: {
    ...state.status,
    update: 'loading',
  },
});

const updateSuccess = (state, { entities }) => ({
  ...state,
  entities: merge({}, state.entities, entities),
  status: {
    ...state.status,
    update: 'success,',
  },
});
const updateFailure = state => ({
  ...state,
  status: {
    ...state.status,
    update: 'failure',
  },
});

export default createReducer(
  {
    [A.loadTodosRequest]: state => ({
      ...state,
      status: {
        ...state.status,
        load: 'loading',
      },
    }),
    [A.loadTodosSuccess]: (state, { ids, entities }) => ({
      ...state,
      ids,
      entities,
      status: {
        ...state.status,
        load: 'success',
      },
    }),
    [A.loadTodosFailure]: state => ({
      ...state,
      status: {
        ...state.status,
        load: 'failure,',
      },
    }),
    [A.pickupRequest]: updateRequest,
    [A.pickupSuccess]: updateSuccess,
    [A.pickupFailure]: updateFailure,
    [A.deliverRequest]: updateRequest,
    [A.deliverSuccess]: updateSuccess,
    [A.deliverFailure]: updateFailure,
  },
  defaultState,
);
