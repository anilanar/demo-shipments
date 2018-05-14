import React from 'react';
import { compose, withProps, pure, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';

import { assignRequest } from '@services/shipments/actions';
import { addStatus } from '@util/shipment-status';
import { asyncComponent } from '@util/async-component';
import { Assignee } from '@components/Shipments/Assignee';
import { PickupTime } from '@components/Shipments/PickupTime';
import { DeliveryTime } from '@components/Shipments/DeliveryTime';
import { Card } from '@components/Shipments/Card';

import styles from './Shipment.module.css';
// import { AssignUser } from './AssignUser';

const AssignButton = ({ shipment, onClick }) => (
  <>
    {shipment.assignee ? (
      false
    ) : (
      <button onClick={onClick} className={styles.assign}>
        Assign
      </button>
    )}
  </>
);

const AsyncAssignUser = asyncComponent(() =>
  import('./AssignUser').then(({ AssignUser }) => AssignUser),
);

const SuggestionsModal = ({ isShown, close, assign }) => (
  <>{isShown ? <AsyncAssignUser onSelect={assign} onExit={close} /> : false}</>
);

const ShipmentView = ({
  shipment,
  showSuggestions,
  assign,
  openSuggestionsModal,
  closeSuggestionsModal,
}) => (
  <Card shipment={shipment}>
    <Assignee shipment={shipment} />
    <PickupTime shipment={shipment} />
    <DeliveryTime shipment={shipment} />
    <AssignButton shipment={shipment} onClick={openSuggestionsModal} />
    <SuggestionsModal
      isShown={showSuggestions}
      close={closeSuggestionsModal}
      assign={assign}
    />
  </Card>
);

const enhance = compose(
  pure,
  connect(undefined, {
    assignRequest,
  }),
  withStateHandlers(
    {
      showSuggestions: false,
    },
    {
      openSuggestionsModal: () => () => ({ showSuggestions: true }),
      closeSuggestionsModal: () => () => ({ showSuggestions: false }),
      assign: (_, { shipment, assignRequest }) => ({ user }) => {
        assignRequest(shipment.id, user.id);
        return { showSuggestions: false };
      },
    },
  ),
  withProps(({ shipment }) => ({
    shipment: addStatus(shipment),
  })),
);

export const Shipment = enhance(ShipmentView);
