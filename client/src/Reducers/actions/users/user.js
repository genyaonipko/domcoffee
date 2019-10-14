/* eslint-disable */
import { createActions } from 'reduxsauce';
// import {
//   getUsersRequest,
//   deleteUserRequest,
//   updateUserRequest,
// } from '../../../domCoffeeConnect';
// import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

export const { Creators } = createActions(
  {
    getUsers: ['payload'],
  },
  {},
);

const getAllUser = () => dispatch => {
  // getUsersRequest(dcRequest.getUsersRequest(), (data, error) => {
  //   if (error !== undefined) {
  //     dispatch(console.log(error));
  //   } else if (data !== undefined) {
  //     dispatch(Creators.getUsers(data.data));
  //   }
  // });
};

const deleteUserAction = key => dispatch => {
  // deleteUserRequest(dcRequest.deleteUserRequest(key), (data, error) => {
  //   if (error !== undefined) {
  //     dispatch(console.log(error));
  //   } else if (data !== undefined) {
  //     dispatch(getAllUser());
  //   }
  // });
};

const updateUser = (key, user) => dispatch => {
  // updateUserRequest(dcRequest.updateUserRequest(key, user), (data, error) => {
  //   if (error !== undefined) {
  //     dispatch(console.log(error));
  //   } else if (data !== undefined) {
  //     dispatch(getAllUser());
  //   }
  // });
};

export default { getAllUser, deleteUserAction, updateUser }
