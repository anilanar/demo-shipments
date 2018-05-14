import React from 'react';

import { Title } from './Title';
import { Origin } from './Origin';
import { Destination } from './Destination';
import styles from './Card.module.css';

const CardView = ({
  shipment,
  children,
}) => (
  <div className={styles.card}>
    <Title shipment={shipment} />
    <div className={styles.content}>
      <Origin shipment={shipment} />
      <Destination shipment={shipment} />
      {children}
    </div>
  </div>
);

export const Card = CardView;
