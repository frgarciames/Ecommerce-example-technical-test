import React from 'react';

export const Context = React.createContext();

export const withContext = Component => {
  const WrappedComponent = props => (
    <Context.Consumer>
      {context => <Component {...props} context={context} />}
    </Context.Consumer>
  )
  WrappedComponent.displayName = Component.name
  return WrappedComponent;
};