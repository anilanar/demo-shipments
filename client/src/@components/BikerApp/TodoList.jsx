import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getDenormalized } from '@services/todos/selectors';
import { Todo } from './Todo';
import { List } from '@components/Shipments/List';

const render = todo => (<Todo key={todo.id} todo={todo} />);

const TodoListView = ({ todos }) => (
  <List shipments={todos} renderShipment={render} />
);

const enhance = compose(
  connect(createStructuredSelector({
    todos: getDenormalized,
  })),
);

export const TodoList = enhance(TodoListView);
