import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  authenticated,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
          }}
        />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;
