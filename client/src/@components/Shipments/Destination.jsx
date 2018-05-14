import React from 'react';
import Arrow from 'react-icons/lib/fa/long-arrow-right';

export const Destination = ({ shipment }) => (
  <span>
    <Arrow /> {shipment.destination}
  </span>
);
