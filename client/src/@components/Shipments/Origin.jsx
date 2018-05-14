import React from 'react';
import MapMarker from 'react-icons/lib/fa/map-marker';

export const Origin = ({ shipment }) => (
  <span>
    <MapMarker /> {shipment.origin}
  </span>
);
