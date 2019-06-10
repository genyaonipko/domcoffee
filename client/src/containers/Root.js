import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import jwtDecode from 'jwt-decode';
import App from './App';
import store from '../redux/store';
import history from '../utils/history';
import setAuthToken from '../utils/setAuthToken';
import { logoutUser } from '../redux/actions/authentication';
import { Creators as AdditionalActions } from '../redux/actions/additional/additional';
import Fixture from '../components/Fixture';

const screenWidth = window.innerWidth;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
  direction: 'ltr',
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
});

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(AdditionalActions.setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class Root extends Component {
  render() {
    if (screenWidth < 768) return <Fixture />;
    return (
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider
              utils={MomentUtils}
              locale="ru"
              moment={moment}>
              <Switch>
                <Route path="/" component={App} />
              </Switch>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default Root;
