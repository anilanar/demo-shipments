import React from 'react';
import Bicycle from 'react-icons/lib/fa/bicycle';

export const Assignee = ({ shipment }) => (
  <>
    {shipment.assignee ? (
      <span>
        <Bicycle /> {shipment.assignee.name}
      </span>
    ) : (
      false
    )}
  </>
);
