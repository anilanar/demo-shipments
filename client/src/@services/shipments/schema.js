import { schema } from 'normalizr';

export const user = new schema.Entity('users');
export const shipment = new schema.Entity('shipments', { assignee: user });
export const shipmentList = new schema.Array(shipment);
