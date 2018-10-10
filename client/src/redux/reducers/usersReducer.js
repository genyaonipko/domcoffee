import { GET_USERS } from '../actions/actionTypes';

function dataUsersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}

export default dataUsersReducer;
