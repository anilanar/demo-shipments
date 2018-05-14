import { of } from 'rxjs';
import { combineEpics } from 'redux-observable';
import {
  switchMap,
  map,
  catchError,
  filter,
  mapTo,
  withLatestFrom,
  exhaustMap,
} from 'rxjs/operators';
import { normalize } from 'normalizr';

import { forActions } from '@util/for-action';
import * as AuthA from '@services/authentication/actions';
import { getRole } from '@services/authentication/selectors';

import * as Api from './api';
import * as Schema from './schema';
import * as A from './actions';

const load$$ = (action$, state$) =>
  action$.pipe(
    forActions(AuthA.authenticateSuccess),
    withLatestFrom(state$),
    filter(
      ([, state]) => getRole(state) === 'admin' || getRole(state) === 'manager',
    ),
    mapTo(A.loadShipmentsRequest()),
  );

const fetch$$ = (action$, _, { app }) =>
  action$.pipe(
    forActions(A.loadShipmentsRequest),
    switchMap(action =>
      of(1).pipe(
        Api.load({ app }),
        map(shipments => normalize(shipments, Schema.shipmentList)),
        map(({ result: ids, entities }) =>
          A.loadShipmentsSuccess(ids, entities),
        ),
        catchError(error => of(A.loadShipmentsFailure.asError())),
      ),
    ),
  );

const assign$$ = (action$, _, { app }) =>
  action$.pipe(
    forActions(A.assignRequest),
    exhaustMap(({ payload: { id, userId } }) =>
      of({ id, userId }).pipe(
        Api.assign({ app }),
        map(shipment => normalize(shipment, Schema.shipment)),
        map(({ result: id, entities }) => A.assignSuccess(id, entities)),
        catchError(error => of(A.assignFailure.asError())),
      ),
    ),
  );

export const createEpic = (options = {}) => {
  return combineEpics(fetch$$, load$$, assign$$);
};
