/* eslint-disable */
import { createActions } from 'reduxsauce';
import { UserApi } from '../../Services';

export const { Creators } = createActions(
  {
    getUsers: ['payload'],
  },
  {},
);

export const getUsers = () => dispatch => {
  UserApi.getUsers()
    .then(({ status, data }) => {
      dispatch(Creators.getUsers(data.data))
    })
    .catch((err) => {
      console.log(err)
    })
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
