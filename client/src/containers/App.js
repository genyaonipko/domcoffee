import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dashboard from '../pages/Dashboard/Dashboard';
import Sales from '../pages/Sales/Sales';
import Packs from '../pages/Packs/Packs';
import Own from '../pages/Own/Own';
import Inner from '../pages/Inner/Inner';
import Settings from '../pages/Settings/Settings';
import ProtectedRoute from '../components/ProtectedRoute';
import DrawerBar from '../components/Drawer';
import Login from '../pages/Login/Login';
import * as authSelectors from '../redux/reducers/authReducer/selectors';

class App extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    role: PropTypes.string.isRequired,
  };

  static defaultProps = {
    authenticated: false,
  };

  render() {
    const { authenticated, role } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        {authenticated ? <DrawerBar {...this.props} /> : null}
        <Switch>
          <ProtectedRoute
            exact
            path="/login"
            component={Login}
            redirectTo="/dashboard"
            authenticated={!authenticated}
          />
          <ProtectedRoute
            exact
            path="/dashboard"
            component={Dashboard}
            redirectTo="/login"
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path="/packs"
            component={Packs}
            redirectTo="/login"
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path="/sales"
            component={Sales}
            redirectTo="/login"
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path="/inner"
            component={Inner}
            redirectTo="/login"
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path="/own"
            component={Own}
            redirectTo="/login"
            authenticated={authenticated}
          />
          <ProtectedRoute
            path="/settings"
            component={Settings}
            redirectTo={authenticated ? '/dashboard' : '/login'}
            authenticated={authenticated && role === 'admin'}
          />
          <Redirect to={authenticated ? '/dashboard' : '/login'} />
        </Switch>
      </div>
    );
  }
}

const mSTP = createStructuredSelector({
  authenticated: authSelectors.selectIsAuthenticated,
  role: authSelectors.selectRole,
});

export default connect(
  mSTP,
  null,
)(App);
