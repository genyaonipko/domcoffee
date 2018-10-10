import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../pages/Dashboard/Dashboard';
import Sales from '../pages/Sales/Sales';
import Coffee from '../pages/Coffee/Coffee';
import Personal from '../pages/Personal/Personal';
import Amount from '../pages/Amount/Amount';
import Settings from '../pages/Settings/Settings';
import ProtectedRoute from '../components/ProtectedRoute';
import DrawerBar from '../components/Drawer';

class App extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
  };

  static defaultProps = {
    authenticated: false,
  };

  render() {
    const { authenticated, role } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <DrawerBar {...this.props} />
        <Switch>
          <ProtectedRoute
            exact
            path="/dashboard"
            component={Dashboard}
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
            path="/coffee"
            component={Coffee}
            redirectTo="/login"
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path="/personal"
            component={Personal}
            redirectTo="/login"
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path="/amount"
            component={Amount}
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

const mSTP = state => ({
  authenticated: state.auth.isAuthenticated,
  role: state.auth.user.role,
});

export default connect(
  mSTP,
  null,
)(App);
