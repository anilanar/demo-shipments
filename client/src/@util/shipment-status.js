export const addStatus = shipment => ({
  ...shipment,
  status: getStatus(shipment),
});

const getStatus = shipment => {
  if (shipment.deliveryTime) {
    return {
      value: 'delivered',
      text: 'Delivered',
    };
  }
  if (shipment.pickupTime) {
    return {
      value: 'pickedup',
      text: 'Picked up',
    };
  }
  if (shipment.assignee) {
    return {
      value: 'assigned',
      text: 'Assigned',
    }
  }
  return {
    value: 'waiting',
    text: 'Waiting',
  };
};
