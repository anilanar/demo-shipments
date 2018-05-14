import { mergeMap } from "rxjs/operators";

export const load = ({ app }) => source$ =>
  source$.pipe(
    mergeMap(() => app.service('users').find({
      query: { role: 'biker' }
    })),
  );
