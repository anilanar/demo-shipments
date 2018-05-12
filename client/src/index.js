// import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// const socket = io('http://localhost:3030', {
//   transports: ['websocket']
// });
const restClient = feathers.rest('http://localhost:3030');
const app = feathers();

// app.configure(feathers.socketio(socket));
app.configure(restClient.fetch(window.fetch));
app.configure(feathers.authentication({
  storage: window.localStorage,
}));

const store = configureStore({ app });

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root'),
);

registerServiceWorker();
