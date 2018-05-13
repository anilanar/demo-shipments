import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { userList } from './schema';

export const selectUsers = state => state.users;

export const getDenormalized = createSelector(
  selectUsers,
  shipments => denormalize(
    shipments.ids,
    userList,
    shipments.entities,
  ),
);
