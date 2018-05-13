import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getDenormalized } from '../../services/shipments/selectors';

import { Shipment } from './Shipment';
import S from './ShipmentList.module.css';

const ShipmentListView = ({ shipments }) => (
  <div className={S.list}>
    {shipments.map(shipment => (
      <Shipment key={shipment.id} shipment={shipment} />
    ))}
  </div>
);

const enhance = compose(
  connect(createStructuredSelector({
    shipments: getDenormalized,
  })),
);

export const ShipmentList = enhance(ShipmentListView);
