
import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable'
import Types from '../../actionTypes';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from([]);

/* -------------------- Handlers ------------------  */
export const getUsers = (_, action) => ([ ...action.payload ]);

export const HANDLERS = {
  [Types.GET_USERS]: getUsers,
};

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
