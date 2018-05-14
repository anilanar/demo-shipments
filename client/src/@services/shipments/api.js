import { mergeMap } from "rxjs/operators";

export const load = ({ app }) => source$ =>
  source$.pipe(
    mergeMap(() => app.service('shipments').find({
      query: { fill_assignees: 1 },
    })),
  );

export const assign = ({ app }) => source$ =>
  source$.pipe(
    mergeMap(({ id, userId }) =>
      app.service('shipments').patch(id, {
        assignee: userId,
      }, {
        query: { fill_assignees: 1 }
      })
    ),
  );
