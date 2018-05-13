import { of } from 'rxjs';
import { catchError, ignoreElements, map, switchMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import * as A from './actions';
import * as Api from './api';

export const createEpic = (options = {}) => {
  const request$$ = (action$, _, { app }) =>
    action$.pipe(
      ofType(A.authenticateRequest.getType()),
      map(action => action.payload),
      switchMap(credentials =>
        of(credentials).pipe(
          Api.authenticate({ app }),
          map(user => A.authenticateSuccess(user)),
          catchError(error => of(A.authenticateFailure.asError())),
        ),
      ),
    );

  const checkAuthentication$$ = (action$, _, { app }) =>
    action$.pipe(
      ofType(A.checkAuthentication.getType()),
      switchMap(() =>
        of(null).pipe(
          Api.authenticate({ app }),
          map(user => A.authenticateSuccess(user)),
          catchError(error => of(A.authenticateFailure.asError())),
        ),
      ),
    );

  const logout$$ = (action$, _, { app }) =>
    action$.pipe(
      ofType(A.logout.getType()),
      Api.logout({ app }),
      ignoreElements(),
    );

  return combineEpics(request$$, logout$$, checkAuthentication$$);
};
