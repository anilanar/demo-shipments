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
      ([, state]) => getRole(state) === 'biker',
    ),
    mapTo(A.loadTodosRequest()),
  );

const fetch$$ = (action$, _, { app }) =>
  action$.pipe(
    forActions(A.loadTodosRequest),
    switchMap(action =>
      of(1).pipe(
        Api.load({ app }),
        map(todos => normalize(todos, Schema.todoList)),
        map(({ result: ids, entities }) =>
          A.loadTodosSuccess(ids, entities),
        ),
        catchError(error => of(A.loadTodosFailure.asError())),
      ),
    ),
  );

const pickup$$ = (action$, _, { app }) =>
  action$.pipe(
    forActions(A.pickupRequest),
    exhaustMap(({ payload: { id } }) =>
      of({ id }).pipe(
        Api.pickup({ app }),
        map(todo => normalize(todo, Schema.todo)),
        map(({ result: id, entities }) => A.pickupSuccess(id, entities)),
        catchError(error => of(A.pickupFailure.asError())),
      ),
    ),
  );

const deliver$$ = (action$, _, { app }) =>
  action$.pipe(
    forActions(A.deliverRequest),
    exhaustMap(({ payload: { id } }) =>
      of({ id }).pipe(
        Api.deliver({ app }),
        map(todo => normalize(todo, Schema.todo)),
        map(({ result: id, entities }) => A.deliverSuccess(id, entities)),
        catchError(error => of(A.deliverFailure.asError())),
      ),
    ),
  );

export const createEpic = (options = {}) => {
  return combineEpics(fetch$$, load$$, pickup$$, deliver$$);
};
