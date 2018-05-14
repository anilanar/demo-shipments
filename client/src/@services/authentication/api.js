import { tap, mergeMap } from 'rxjs/operators';

export const authenticate = ({ app }) => source$ =>
  source$.pipe(
    mergeMap(credentials =>
      app.authenticate(
        credentials ? { ...credentials, strategy: 'local' } : undefined,
      ),
    ),
    mergeMap(response => app.passport.verifyJWT(response.accessToken)),
    mergeMap(jwtPayload => app.service('users').get(jwtPayload.userId)),
  );

export const logout = ({ app }) => source$ =>
  source$.pipe(tap(() => app.logout()));
