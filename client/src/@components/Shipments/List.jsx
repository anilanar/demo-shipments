import React from 'react';
import S from './List.module.css';

const ListView = ({ shipments, renderShipment }) => (
  <div className={S.list}>
    {shipments.map(shipment => renderShipment(shipment) )}
  </div>
);

export const List = ListView;
