import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

const View = ({ onSubmit, onUsernameChange, onPasswordChange, password, username }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={onUsernameChange}
      />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

const enhance = compose(
  withState('username', 'updateUsername', ''),
  withState('password', 'updatePassword', ''),
  withHandlers({
    onUsernameChange: ({ updateUsername }) => event => {
      updateUsername(event.target.value);
    },
    onPasswordChange: ({ updatePassword }) => event => {
      updatePassword(event.target.value);
    },
    onSubmit: ({ username, password }) => event => {
      event.preventDefault();
      console.log({username, password});
    },
  })
);

export const Login = enhance(View);
