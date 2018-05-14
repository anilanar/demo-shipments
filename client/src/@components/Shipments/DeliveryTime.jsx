import React from 'react';
import Check from 'react-icons/lib/fa/check';
import { formatTime } from '@util/format-time';

export const DeliveryTime = ({ shipment }) => (
  <>
    {shipment.deliveryTime ? (
      <span>
        <Check /> {formatTime(shipment.deliveryTime)}
      </span>
    ) : (
      false
    )}
  </>
);
