import React from 'react';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { getUser } from '@services/authentication/selectors';
import { Login } from '@components/Authentication/Login';
import { ManagerApp } from '@components/ManagerApp/ManagerApp';
import S from './App.module.css';
import { BikerApp } from './BikerApp/BikerApp';

const AppView = ({ user }) => (
  <div className={S.app}>
    { !user
      ? <Login />
      : user.role === 'manager'
      ? <ManagerApp />
      : user.role === 'biker'
      ? <BikerApp />
      : <h1>An unknown problem has occurred.</h1>
    }
  </div>
);

const enhance = compose(
  connect(createStructuredSelector({
    user: getUser,
  })),
  pure,
);

export const App = enhance(AppView);
