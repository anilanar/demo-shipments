import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import User from 'react-icons/lib/fa/user';
import Refresh from 'react-icons/lib/fa/refresh';

import { getUser } from '@services/authentication/selectors';
import { Logout } from '@components/Authentication/Logout';

import S from './AppContainer.module.css';

const AppContainerView = ({ user, children, refresh }) => (
  <div className={S.container}>
    <div className={S.userInfo}>
      <button onClick={refresh} className={S.refresh}>
        <Refresh /> Refresh
      </button>
      <span className={S.userBadge}>
        <User /> {user.name}
      </span>
      <Logout />
    </div>
    {children}
  </div>
);

const enhance = connect(
  createStructuredSelector({
    user: getUser,
  }),
);

export const AppContainer = enhance(AppContainerView);
