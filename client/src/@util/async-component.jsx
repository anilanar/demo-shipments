import React from 'react';

export const asyncComponent = importFn => {
  return class extends React.Component {
    state = {
      Component: null,
    };

    async componentDidMount() {
      this.setState({
        Component: await importFn(),
      });
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : false;
    }
  };
};
