import feathers from '@feathersjs/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { of } from 'rxjs';
import { tap, mergeMap, ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from './store';
import {
  checkAuthentication,
  authenticateSuccess,
  authenticateFailure,
} from './services/authentication/actions';
import { Provider as AppProvider } from './util/react-feathers-app';
import { getApplicationNode } from './util/application-node';

const restClient = feathers.rest('http://localhost:3030');
const app = feathers();

// app.configure(feathers.socketio(socket));
app.configure(restClient.fetch(window.fetch));
app.configure(
  feathers.authentication({
    storage: window.localStorage,
  }),
);

const store = createStore({ app });

const render = () => {
  ReactDOM.render(
    <AppProvider app={app}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </AppProvider>,
    getApplicationNode(),
  );
};

store.addEpic(action$ =>
  of(1).pipe(
    tap(() => store.dispatch(checkAuthentication())),
    mergeMap(() => action$),
    ofType(authenticateSuccess.getType(), authenticateFailure.getType()),
    tap(render),
    ignoreElements(),
  ),
);

registerServiceWorker();
