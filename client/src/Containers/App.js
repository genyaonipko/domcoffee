import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Coffee from '../Pages/Coffee/Coffee';
import Packs from '../Pages/Packs/Packs';
import Portion from '../Pages/Portion/Portion';
import Settings from '../Pages/Settings/Settings';
import ProtectedRoute from '../Components/ProtectedRoute';
import DrawerBar from '../Components/Drawer';
import Login from '../Pages/Login/Login';
import { AuthSelectors } from '../Reducers/AuthReducers';

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
            path="/coffee"
            component={Coffee}
            redirectTo="/login"
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path="/portion"
            component={Portion}
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
  authenticated: AuthSelectors.selectIsAuthenticated,
  role: AuthSelectors.selectRole,
});

export default connect(
  mSTP,
  null,
)(App);
