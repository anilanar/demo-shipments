import { createAction } from 'redux-act';

export const loadTodosRequest = createAction('LOAD_TODOS_REQUEST');

export const loadTodosSuccess = createAction(
  'LOAD_TODOS_SUCCESS',
  (ids, entities) => ({ ids, entities }),
);

export const loadTodosFailure = createAction('LOAD_TODOS_FAILURE');

export const pickupRequest = createAction('PICKUP_REQUEST', id => ({ id }));
export const pickupSuccess = createAction('PICKUP_SUCCESS', (id, entities) => ({
  id,
  entities,
}));
export const pickupFailure = createAction('PICKUP_FAILURE');

export const deliverRequest = createAction('DELIVER_REQUEST', id => ({ id }));
export const deliverSuccess = createAction(
  'DELIVER_SUCCESS',
  (id, entities) => ({ id, entities }),
);
export const deliverFailure = createAction('DELIVER_FAILURE');
