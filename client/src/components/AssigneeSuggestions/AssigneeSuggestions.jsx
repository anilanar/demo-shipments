import React from 'react';
import AriaModal from 'react-aria-modal';
// import { compose } from 'recompose';

import { SuggestionInput } from './SuggestionInput';
import { getApplicationNode } from '../../util/application-node';

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

const AssigneeSuggestionsView = ({ onSelect, onExit }) => (
  <AriaModal
    titleText={'Foo'}
    getApplicationNode={getApplicationNode}
    dialogStyle={dialogStyle}
    onExit={onExit}
    focusTrapOptions={focusTrapOptions}
  >
    <SuggestionInput onSelect={onSelect} />
  </AriaModal>
);

export const AssigneeSuggestions = AssigneeSuggestionsView;
