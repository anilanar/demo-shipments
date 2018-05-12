import { combineReducers, compose as compose_, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import * as Auth from './services/authentication';

export const configureStore = ({ app }) => {
  const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose_;
  const reducer = combineReducers({
    authentication: Auth.reducer,
  });
  const rootEpic$ = combineEpics(
    Auth.configureEpic({ app }),
  );
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(
        createEpicMiddleware(rootEpic$),
      ),
    ),
  );

  return store;
}
