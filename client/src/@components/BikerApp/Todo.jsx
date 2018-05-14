import React from 'react';
import { compose, withProps, pure, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { pickupRequest, deliverRequest } from '@services/todos/actions';
import { addStatus } from '@util/shipment-status';
import { Card } from '@components/Shipments/Card';
import { PickupTime } from '@components/Shipments/PickupTime';
import { DeliveryTime } from '@components/Shipments/DeliveryTime';
import S from './Todo.module.css';

const PickupButton = ({ todo, onClick }) => (
  <>
    {todo.status.value === 'assigned' ? (
      <button className={S.button} onClick={onClick}>Pickup</button>
    ) : (
      false
    )}
  </>
);

const DeliverButton = ({ todo, onClick }) => (
  <>
    {todo.status.value === 'pickedup' ? (
      <button className={S.button} onClick={onClick}>Deliver</button>
    ) : (
      false
    )}
  </>
);

const ControlButtons = ({ todo, pickup, deliver }) => {
  const Button =
    todo.status.value === 'assigned' ? (
      <PickupButton todo={todo} onClick={pickup} />
    ) : todo.status.value === 'pickedup' ? (
      <DeliverButton todo={todo} onClick={deliver} />
    ) : (
      false
    );
  return <> <span className={S.filler} /> {Button} </>;
};

const TodoView = ({ todo, pickup, deliver }) => (
  <Card shipment={todo}>
    <PickupTime shipment={todo} />
    <DeliveryTime shipment={todo} />
    <ControlButtons todo={todo} pickup={pickup} deliver={deliver} />
  </Card>
);

const enhance = compose(
  pure,
  connect(undefined, {
    pickupRequest,
    deliverRequest,
  }),
  withHandlers({
    pickup: ({ pickupRequest, todo }) => () => pickupRequest(todo.id),
    deliver: ({ deliverRequest, todo }) => () => deliverRequest(todo.id),
  }),
  withProps(({ todo }) => ({
    todo: addStatus(todo),
  })),
);

export const Todo = enhance(TodoView);
