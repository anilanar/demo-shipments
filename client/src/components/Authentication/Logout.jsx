import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../services/authentication/actions';

const LogoutView = ({ logout }) => (
  <button onClick={logout}>Logout</button>
);

export const Logout = connect(undefined, { logout })(LogoutView);
