import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { authenticateRequest } from '@services/authentication/actions';
import S from './Login.module.css';
import User from 'react-icons/lib/fa/user';
import Key from 'react-icons/lib/fa/key';

const LoginView = ({
  onSubmit,
  onUsernameChange,
  onPasswordChange,
  password,
  username,
}) => (
  <div className={S.container}>
    <p className={S.info}>
      This application uses mock data. You can login as{' '}
      <code>manager:manager</code> or as <code>bikerN:bikerN</code> where{' '}
      <code>0 &le; N &le; 9</code>.
    </p>
    <form className={S.form} onSubmit={onSubmit}>
      <div className={S.field}>
        <label className={S.label} htmlFor="username">
          <User />
        </label>
        <input
          type="text"
          id="username"
          className={S.input}
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div className={S.field}>
        <label className={S.label} htmlFor="password">
          <Key />
        </label>
        <input
          type="password"
          id="password"
          className={S.input}
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button className={S.loginButton} type="submit">
        Login
      </button>
    </form>
  </div>
);

const enhance = compose(
  connect(undefined, { authenticateRequest }),
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withHandlers({
    onUsernameChange: ({ setUsername }) => event => {
      setUsername(event.target.value);
    },
    onPasswordChange: ({ setPassword }) => event => {
      setPassword(event.target.value);
    },
    onSubmit: ({ username, password, authenticateRequest }) => event => {
      event.preventDefault();
      authenticateRequest(username, password);
    },
  }),
);

export const Login = enhance(LoginView);
