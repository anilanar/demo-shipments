import React from 'react';
import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getDenormalized } from '@services/shipments/selectors';

import { Shipment } from './Shipment';
import { List } from '@components/Shipments/List';

const render = shipment => (<Shipment key={shipment.id} shipment={shipment} />);

const ShipmentListView = ({ shipments }) => (
  <List shipments={shipments} renderShipment={render} />
);

const enhance = compose(
  connect(createStructuredSelector({
    shipments: getDenormalized,
  })),
  pure,
);

export const ShipmentList = enhance(ShipmentListView);
