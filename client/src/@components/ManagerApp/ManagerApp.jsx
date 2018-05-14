import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { loadShipmentsRequest } from '@services/shipments/actions';
import { AppContainer } from '@components/AppContainer';
import { ShipmentList } from './ShipmentList';

const ManagerAppView = ({ refresh }) => (
  <AppContainer refresh={refresh}>
    <ShipmentList />
  </AppContainer>
);

const enhance = compose(
  connect(undefined, {
    loadShipmentsRequest,
  }),
  withHandlers({
    refresh: ({ loadShipmentsRequest }) => () => loadShipmentsRequest(),
  }),
);

export const ManagerApp = enhance(ManagerAppView);
