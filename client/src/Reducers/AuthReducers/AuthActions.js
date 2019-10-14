import jwtDecode from 'jwt-decode';
import { createActions } from 'reduxsauce';
import setAuthToken from '../../utils/setAuthToken';
import history from '../../utils/history';
import { AuthApi } from '../../Services';

export const { Creators } = createActions(
  {
    logInInit: [],
    logInSuccess: ['payload'],
    logInFailure: ['payload'],
    logOut: [],
  },
  {},
);

export const registerUser = user => dispatch => {
  AuthApi.registerUser(user)
    .then(() => history.push('/settings/users'))
    .catch(error => {
      dispatch(Creators.logInFailure({ error }));
    });
};

export const loginUser = user => dispatch => {
  dispatch(Creators.logInInit());
  AuthApi.logIn(user)
    .then(res => {
      if (res.status === 200) {
        const { token } = res.data;
        localStorage.setItem('JWT_TOKEN', token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        dispatch(Creators.logInSuccess({ user: decoded }));
      }
    })
    .then(() => history.push('/dashboard'))
    .catch(error => {
      // Fix me errors on backend
      const { password = '', email = '' } = error.response.data;
      dispatch(Creators.logInFailure({ error: password || email }));
      setTimeout(() => {
        dispatch(Creators.logInFailure({ error: '' }));
      }, 3000);
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('JWT_TOKEN');
  setAuthToken(false);
  dispatch(Creators.logOut());
  history.push('/login');
};
