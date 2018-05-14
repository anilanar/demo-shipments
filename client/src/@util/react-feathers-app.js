import React from 'react';
import PropTypes from 'prop-types';
import { withContext, getContext } from 'recompose';

const contextful = withContext({ app: PropTypes.object }, ({ app }) => ({
  app,
}));
export const Provider = contextful(({ children }) =>
  React.Children.only(children),
);

export const connect = getContext({ app: PropTypes.object });
