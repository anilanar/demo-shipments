import React from 'react';
import Truck from 'react-icons/lib/fa/truck';
import { formatTime } from '@util/format-time';

export const PickupTime = ({ shipment }) => (
  <>
    {shipment.pickupTime ? (
      <span>
        <Truck /> {formatTime(shipment.pickupTime)}
      </span>
    ) : (
      false
    )}
  </>
);
