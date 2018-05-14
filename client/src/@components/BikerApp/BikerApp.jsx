import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { loadTodosRequest } from '@services/todos/actions';
import { AppContainer } from '@components/AppContainer';
import { TodoList } from './TodoList';

export const BikerAppView = ({ refresh }) => (
  <AppContainer refresh={refresh}>
    <TodoList />
  </AppContainer>
);

const enhance = compose(
  connect(undefined, {
    loadTodosRequest,
  }),
  withHandlers({
    refresh: ({ loadTodosRequest }) => () => loadTodosRequest(),
  }),
);

export const BikerApp = enhance(BikerAppView);
