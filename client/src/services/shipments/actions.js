import { createAction } from 'redux-act';

export const loadShipmentsRequest = createAction('LOAD_SHIPMENTS_REQUEST');

export const loadShipmentsSuccess = createAction(
  'LOAD_SHIPMENTS_SUCCESS',
  (ids, entities) => ({ ids, entities }),
);

export const loadShipmentsFailure = createAction('LOAD_SHIPMENTS_FAILURE');

export const assignRequest = createAction(
  'ASSIGN_REQUEST',
  (id, userId) => ({ id, userId }),
);
export const assignSuccess = createAction(
  'ASSIGN_SUCCESS',
  (id, entities) => ({ id, entities }),
);
export const assignFailure = createAction(
  'ASSIGN_FAILURE',
);
