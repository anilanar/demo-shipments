import React from 'react';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { asyncComponent } from '@util/async-component';
import { getUser } from '@services/authentication/selectors';
// import { Login } from '@components/Authentication/Login';
// import { ManagerApp } from '@components/ManagerApp/ManagerApp';
import S from './App.module.css';
// import { BikerApp } from './BikerApp/BikerApp';

const AsyncLogin = asyncComponent(() =>
  import('@components/Authentication/Login').then(({ Login }) => Login),
);
const AsyncManagerApp = asyncComponent(() =>
  import('@components/ManagerApp/ManagerApp').then(
    ({ ManagerApp }) => ManagerApp,
  ),
);
const AsyncBikerApp = asyncComponent(() =>
  import('@components/BikerApp/BikerApp').then(({ BikerApp }) => BikerApp),
);

const AppView = ({ user }) => (
  <div className={S.app}>
    {!user ? (
      <AsyncLogin />
    ) : user.role === 'manager' ? (
      <AsyncManagerApp />
    ) : user.role === 'biker' ? (
      <AsyncBikerApp />
    ) : (
      <h1>An unknown problem has occurred.</h1>
    )}
  </div>
);

const enhance = compose(
  connect(
    createStructuredSelector({
      user: getUser,
    }),
  ),
  pure,
);

export const App = enhance(AppView);
