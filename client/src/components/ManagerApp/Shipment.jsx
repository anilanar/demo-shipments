import React from 'react';
import { compose, withProps, pure, withStateHandlers } from 'recompose';
import { connect as connectStore } from 'react-redux';

import Arrow from 'react-icons/lib/fa/long-arrow-right';
import MapMarker from 'react-icons/lib/fa/map-marker';
import Bicycle from 'react-icons/lib/fa/bicycle';
import Truck from 'react-icons/lib/fa/truck';
import Check from 'react-icons/lib/fa/check';

import { assignRequest } from '../../services/shipments/actions';

import styles from './Shipment.module.css';
import classNames from 'classnames/bind';
import { AssigneeSuggestions } from '../AssigneeSuggestions/AssigneeSuggestions';

const S = classNames.bind(styles);
const formatDate = date => new Date(date).toLocaleString();

const Title = ({ shipment, status }) => (
  <h3
    className={S({
      header: true,
      assigned: shipment.assignee,
    })}
  >
    #{shipment.id} ({status})
  </h3>
);
const Origin = ({ shipment }) => (
  <div>
    <span>
      <MapMarker /> {shipment.origin}
    </span>
  </div>
);
const Destination = ({ shipment }) => (
  <div>
    <span>
      <Arrow /> {shipment.destination}
    </span>
  </div>
);
const Assignee = ({ shipment }) => (
  <div>
    {shipment.assignee ? (
      <span>
        <Bicycle /> {shipment.assignee.name}
      </span>
    ) : (
      false
    )}
  </div>
);
const PickupTime = ({ shipment }) => (
  <div>
    {shipment.pickupTime ? (
      <span>
        <Truck /> {formatDate(shipment.pickupTime)}
      </span>
    ) : (
      false
    )}
  </div>
);
const DeliveryTime = ({ shipment }) => (
  <div>
    {shipment.deliveryTime ? (
      <span>
        <Check /> {formatDate(shipment.deliveryTime)}
      </span>
    ) : (
      false
    )}
  </div>
);

const AssignButton = ({ shipment, onClick }) => (
  <button onClick={onClick} value={shipment.id} className={styles.assign}>
    Assign
  </button>
);

const ShipmentView = ({
  shipment,
  status,
  assign,
  showSuggestions,
  openSuggestionsModal,
  closeSuggestionsModal,
}) => (
  <div className={styles.shipment}>
    <Title shipment={shipment} status={status} />
    <div className={styles.content}>
      <Origin shipment={shipment} />
      <Destination shipment={shipment} />
      <Assignee shipment={shipment} />
      <PickupTime shipment={shipment} />
      <DeliveryTime shipment={shipment} />
      {shipment.assignee ? (
        false
      ) : (
        <AssignButton shipment={shipment} onClick={openSuggestionsModal} />
      )}
    </div>
    {showSuggestions ? (
      <AssigneeSuggestions onSelect={assign} onExit={closeSuggestionsModal} />
    ) : (
      false
    )}
  </div>
);

const getStatus = shipment => {
  if (shipment.deliveryTime) {
    return 'Delivered';
  }
  if (shipment.pickupTime) {
    return 'Picked up';
  }
  if (shipment.assignee) {
    return 'Assigned';
  }
  return 'Waiting';
};

const enhance = compose(
  connectStore(undefined, {
    assignRequest,
  }),
  withStateHandlers(
    {
      showSuggestions: false,
    },
    {
      openSuggestionsModal: () => event => {
        return { showSuggestions: true };
      },
      closeSuggestionsModal: () => () => ({ showSuggestions: false }),
      assign: (_, { shipment, assignRequest }) => ({ user }) => {
        assignRequest(shipment.id, user.id);
        return { showSuggestions: false };
      },
    },
  ),
  withProps(({ shipment }) => ({
    shipment: shipment,
    status: getStatus(shipment),
  })),
  pure,
);

export const Shipment = enhance(ShipmentView);
