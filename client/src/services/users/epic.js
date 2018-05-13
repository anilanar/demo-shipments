import { switchMap, map, catchError } from 'rxjs/operators';

import { forActions } from '../../util/for-action';

import * as Schema from './schema';
import * as A from './actions';
import * as Api from './api';
import { normalize } from 'normalizr';
import { of } from 'rxjs';
import { combineEpics } from 'redux-observable';

const load$$ = (action$, _, { app }) =>
  action$.pipe(
    forActions(A.loadUsersRequest),
    switchMap(action =>
      of(1).pipe(
        Api.load({ app }),
        map(users => normalize(users, Schema.userList)),
        map(({ result: ids, entities }) => A.loadUsersSuccess(ids, entities)),
        catchError(error => of(A.loadUsersFailure.asError())),
      ),
    ),
  );

export const createEpic = (options = {}) => {
  return combineEpics(load$$);
};
