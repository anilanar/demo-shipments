import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getUser } from '@services/authentication/selectors';
import { Logout } from '@components/Authentication/Logout';

import S from './AppContainer.module.css';
import User from 'react-icons/lib/fa/user';

const AppContainerView = ({ user, children }) => (
  <>
    <div className={S.userInfo}>
      <span className={S.userBadge}>
        <User /> {user.name}
      </span>
      <Logout />
    </div>
    {children}
  </>
);

const enhance = connect(
  createStructuredSelector({
    user: getUser,
  }),
);

export const AppContainer = enhance(AppContainerView);
