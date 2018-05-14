import React from 'react';
import S from './List.module.css';

const ListView = ({ shipments, renderShipment }) => (
  <>
  { shipments.length > 0 ?
    ( <div className={S.list}>
      {shipments.map(shipment => renderShipment(shipment) )}
    </div>) :
    <p>Nothing to display here.</p>
  }
  </>
);

export const List = ListView;
