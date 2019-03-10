
import { createReducer } from 'reduxsauce';
import Types from '../../actions/actionTypes';

/* -------------------- Handlers ------------------  */
export const setUsers = (state = [], action) =>
  state.merge(action.payload);

export const HANDLERS = {
  [Types.getUsers]: setUsers,
};

/* -------------------- Create Reducer ------------------  */
export default createReducer([], HANDLERS);
