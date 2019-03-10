import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../../actions/actionTypes';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({});

/* -------------------- Handlers ------------------  */
export const setErrors = (state = INITIAL_STATE, action) =>
  state.merge({ setErrors: action.payload });

export const HANDLERS = {
  [Types.GET_ERRORS]: setErrors,
};

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
