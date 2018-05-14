import React from 'react';
import AriaModal from 'react-aria-modal';
// import { compose } from 'recompose';

import { Input } from './AssignUser/Input';
import { getApplicationNode } from '@util/application-node';

const dialogStyle = {
  display: 'inline-flex',
  width: '25em',
  height: '20em',
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '1em',
  marginTop: '4rem',
};

const focusTrapOptions = {
  escapeDeactivates: false,
  returnFocusOnDeactivate: false,
};

const AssignUserView = ({ onSelect, onExit }) => (
  <AriaModal
    titleText={'Foo'}
    getApplicationNode={getApplicationNode}
    dialogStyle={dialogStyle}
    onExit={onExit}
    focusTrapOptions={focusTrapOptions}
  >
    <Input onSelect={onSelect} />
  </AriaModal>
);

export const AssignUser = AssignUserView;
