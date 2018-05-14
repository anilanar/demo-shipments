import React from 'react';
import AutoSuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { compose, withStateHandlers, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';

import Bicycle from 'react-icons/lib/fa/bicycle';

import { getDenormalized } from '@services/users/selectors';
import { loadUsersRequest } from '@services/users/actions';

import Theme from './Input.module.css';

const getValue = user => user.name;
const renderSuggestion = user => (
  <span>
    <Bicycle />
    <span className={Theme.name}>{user.name}</span>
    <span className={Theme.username}>#{user.username}</span>
  </span>
);
const InputView = ({
  clearSuggestions,
  onChange,
  select,
  suggestions,
  updateSuggestions,
  value,
}) => (
  <AutoSuggest
    suggestions={suggestions}
    onSuggestionsFetchRequested={updateSuggestions}
    onSuggestionsClearRequested={clearSuggestions}
    getSuggestionValue={getValue}
    renderSuggestion={renderSuggestion}
    inputProps={{ value, onChange, placeholder: 'Pick assignee...' }}
    alwaysRenderSuggestions={true}
    onSuggestionSelected={select}
    theme={Theme}
  />
);

const enhance = compose(
  connect(
    createStructuredSelector({
      users: getDenormalized,
    }),
    { loadUsersRequest },
  ),
  withStateHandlers(
    ({ users }) => ({
      suggestions: users,
      value: '',
      selection: null,
    }),
    {
      onChange: state => (_, { newValue }) => ({ ...state, value: newValue }),
      updateSuggestions: (state, { users }) => () => ({
        ...state,
        suggestions: users.filter(u =>
          u.name.toLowerCase().includes(state.value.toLowerCase()),
        ),
      }),
      clearSuggestions: state => () => state,
      select: (state, { onSelect }) => (_, { suggestion }) => {
        onSelect({ user: suggestion });
        return state;
      },
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadUsersRequest();
    },
    componentDidUpdate(prevProps) {
      const { users, updateSuggestions } = this.props;
      if (users !== prevProps.users) {
        updateSuggestions();
      }
    },
  }),
);

export const Input = enhance(InputView);
