import {
  combineReducers,
  compose as compose_,
  createStore as createStore_,
  applyMiddleware,
} from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import * as Auth from '@services/authentication';
import * as Shipments from '@services/shipments';
import * as Users from '@services/users';
import * as Todos from '@services/todos';

export const createStore = ({ app }) => {
  const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose_;
  const reducer = combineReducers({
    authentication: Auth.reducer,
    shipments: Shipments.reducer,
    users: Users.reducer,
    todos: Todos.reducer,
  });
  const { epicObserver, root$$ } = createRootEpic(
    { app },
    Auth.createEpic(),
    Shipments.createEpic(),
    Users.createEpic(),
    Todos.createEpic(),
  );

  const store = createStore_(
    reducer,
    compose(
      applyMiddleware(
        createEpicMiddleware(root$$, {
          dependencies: { app },
        }),
      ),
    ),
  );

  return {
    ...store,
    addEpic: epic$$ => epicObserver.next(epic$$),
  };
};

const createRootEpic = ({ app }, ...epics) => {
  const epicObserver = new BehaviorSubject(combineEpics(...epics));
  const root$$ = (action$, store, dependencies) =>
    epicObserver.pipe(mergeMap(epic => epic(action$, store, dependencies)));

  return { epicObserver, root$$ };
};
