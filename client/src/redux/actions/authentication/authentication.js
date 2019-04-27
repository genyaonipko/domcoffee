import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Creators as AdditionalActions } from '../additional/additional';
import setAuthToken from '../../../utils/setAuthToken';
import history from '../../../utils/history';
import { loginUserRequest } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

export const registerUser = user => dispatch => {
  axios
    .post('https://dom-coffee-app.herokuapp.com/api/users/register', user)
    .then(() => history.push('/settings/users'))
    .catch(err => {
      dispatch(AdditionalActions.getErrors(err.response.data));
    });
};

export const loginUser = user => dispatch => {
  loginUserRequest(dcRequest.loginUserRequest(user), (data, error) => {
    if (error !== undefined) {
      dispatch(AdditionalActions.getErrors(error.data));
    } else if (data !== undefined) {
      const { token } = data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(AdditionalActions.setCurrentUser(decoded));
      history.push('/dashboard');
    }
  })
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(AdditionalActions.setCurrentUser({}));
  history.push('/login');
};
