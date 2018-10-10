import axios from 'axios';
import { GET_USERS } from './actionTypes';

export const getAllUser = () => dispatch => {
  axios
    .get('http://80.209.225.150:5000/users/all')
    .then(res => dispatch({ type: GET_USERS, payload: res.data.data }))
    .catch(err => console.log(err));
};

export const deleteUserAction = key => dispatch => {
  axios
    .delete(`http://80.209.225.150:5000/users/${key}`)
    .then(() => dispatch(getAllUser()))
    .catch(err => console.log(err));
};

export const updateUser = (key, user) => dispatch => {
  axios
    .put(`http://80.209.225.150:5000/users/${key}`, user)
    .then(() => dispatch(getAllUser()))
    .catch(err => console.log(err));
};
