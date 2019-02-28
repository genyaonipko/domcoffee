import axios from 'axios';
import { GET_USERS } from '../actionTypes';

export const getAllUser = () => dispatch => {
  axios
    .get('https://dom-coffee-app.herokuapp.com/api/users/all')
    .then(res => dispatch({ type: GET_USERS, payload: res.data.data }))
    .catch(err => console.log(err));
};

export const deleteUserAction = key => dispatch => {
  axios
    .delete(`https://dom-coffee-app.herokuapp.com/api/users/${key}`)
    .then(() => dispatch(getAllUser()))
    .catch(err => console.log(err));
};

export const updateUser = (key, user) => dispatch => {
  axios
    .put(`https://dom-coffee-app.herokuapp.com/api/users/${key}`, user)
    .then(() => dispatch(getAllUser()))
    .catch(err => console.log(err));
};
