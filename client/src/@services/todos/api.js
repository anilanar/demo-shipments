import { mergeMap } from "rxjs/operators";

export const load = ({ app }) => source$ =>
  source$.pipe(
    mergeMap(() => app.service('todos').find()),
  );

export const pickup = ({ app }) => source$ =>
  source$.pipe(
    mergeMap(({ id }) =>
      app.service('todos').patch(id, {
        pickupTime: new Date(),
      })
    ),
  );

export const deliver = ({ app }) => source$ =>
  source$.pipe(
    mergeMap(({ id }) =>
      app.service('todos').patch(id, {
        deliveryTime: new Date(),
      })
    ),
  );
