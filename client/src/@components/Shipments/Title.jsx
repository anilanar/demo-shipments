import React from 'react';
import classNames from 'classnames/bind';
import styles from './Title.module.css';

const S = classNames.bind(styles);

export const Title = ({ shipment }) => (
  <h3
    className={S({
      title: true,
      [shipment.status.value]: true,
    })}
  >
    #{shipment.id} ({shipment.status.text})
  </h3>
);
