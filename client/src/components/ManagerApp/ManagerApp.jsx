import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Logout } from '../Authentication/Logout';
import { getUser } from '../../services/authentication/selectors';
import { ShipmentList } from './ShipmentList';
import S from './ManagerApp.module.css';
import User from 'react-icons/lib/fa/user';

const ManagerAppView = ({ user }) => (
  <div className={S.app}>
    <div className={S.userInfo}>
      <span className={S.userBadge}>
        <User /> {user.name}
      </span>
      <Logout />
    </div>
    <ShipmentList />
  </div>
);

const enhance = connect(
  createStructuredSelector({
    user: getUser,
  }),
);

export const ManagerApp = enhance(ManagerAppView);
