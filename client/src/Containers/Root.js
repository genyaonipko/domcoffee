import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import jwtDecode from 'jwt-decode';
import App from './App';
import store from '../Reducers';
import history from '../utils/history';
import setAuthToken from '../utils/setAuthToken';
import { AuthActions } from '../Reducers/AuthReducers';

// const screenWidth = window.innerWidth;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    fontFamily: '"Helvetica Neue"'
  },
  // direction: 'ltr',
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
  spacing: 4,
});

const token = localStorage.JWT_TOKEN;

if (token) {
  setAuthToken(token);
  const decoded = jwtDecode(token);
  store.dispatch(AuthActions.Creators.logInSuccess({ user: decoded }));
  
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(AuthActions.logoutUser());
    window.location.href = '/login';
  }
}

class Root extends Component {
  render() {
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
