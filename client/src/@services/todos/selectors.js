import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import * as Schema from './schema';

export const selectTodos = state => state.todos;

export const getCount = createSelector(selectTodos, todos => todos.ids.length);

export const getStatus = createSelector(selectTodos, todos => todos.status);

export const getDenormalized = createSelector(selectTodos, todos =>
  denormalize(todos.ids, Schema.todoList, todos.entities),
);
