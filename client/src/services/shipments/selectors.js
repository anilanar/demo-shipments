import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import * as Schema from './schema';

export const selectShipments = state => state.shipments;

export const getCount = createSelector(
  selectShipments,
  shipments => shipments.ids.length,
);

export const getStatus = createSelector(
  selectShipments,
  shipments => shipments.status,
);

export const getDenormalized = createSelector(
  selectShipments,
  shipments => denormalize(
    shipments.ids,
    Schema.shipmentList,
    shipments.entities,
  ),
);
