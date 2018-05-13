import { denormalize as denormalize_, normalize as normalize_, schema } from 'normalizr';

export const user = new schema.Entity('users');
export const shipment = new schema.Entity('shipments', { assignee: user });
export const shipmentList = new schema.Array(shipment);

// export const normalize = data => normalize_(data, shipmentList);
// export const denormalize = (ids, entities) => denormalize_(data, shipmentList, entities)
