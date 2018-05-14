import { createReducer } from "redux-act";
import merge from 'lodash/merge';

import * as A from './actions';

const defaultState = {
  ids: [],
  entities: {
    shipments: {},
    users: {},
  },
  status: {
    assign: null,
    load: null,
  },
};

export default createReducer({
  [A.loadShipmentsRequest]: state => ({
    ...state,
    status: {
      ...state.status,
      load: 'loading',
    },
  }),
  [A.loadShipmentsSuccess]: (state, { ids, entities }) => ({
    ...state,
    ids,
    entities,
    status: {
      ...state.status,
      load: 'success',
    },
  }),
  [A.loadShipmentsFailure]: state => ({
    ...state,
    status: {
      ...state.status,
      load: 'failure,'
    },
  }),
  [A.assignRequest]: state => ({
    ...state,
    status: {
      ...state.status,
      assign: 'loading',
    },
  }),
  [A.assignSuccess]: (state, { entities }) => ({
    ...state,
    entities: merge({}, state.entities, entities),
    status: {
      ...state.status,
      assign: 'success,'
    },
  }),
  [A.assignFailure]: state => ({
    ...state,
    status: {
      ...state.status,
      assign: 'failure',
    },
  }),
}, defaultState);
