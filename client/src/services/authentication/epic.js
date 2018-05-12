import { of } from 'rxjs';
import {
  catchError,
  map,
  // mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import * as A from './actions';

export const configureEpic = ({ app }) => {
  const request$ = action$ =>
    action$.pipe(
      ofType(A.authenticateRequest.getType()),
      map(action => action.payload),
      switchMap(credentials => app.authenticate({
        ...credentials,
        strategy: 'local',
      })),
      tap(x => console.log(x)),
      switchMap(response => app.passport.verifyJWT(response.accessToken)),
      tap(x => console.log(x)),
      switchMap(jwtPayload => app.service('users').get(jwtPayload.userId)),
      map(A.authenticateSuccess),
      catchError(error => of(A.authenticateFailure(error)))
    );

  return combineEpics(
    request$,
  );
}
