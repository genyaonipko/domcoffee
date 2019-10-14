import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({
  fetching: false,
  user: null,
  error: null,
});

/* -------------------- Handlers ------------------  */
export const logInInit = (state = INITIAL_STATE) =>
  state.merge({
    fetching: true,
    user: null,
    error: null,
  });

export const logInSuccess = (state = INITIAL_STATE, action) =>
  state.merge({
    user: action.payload.user,
    fetching: false,
  });

export const logInFailure = (state = INITIAL_STATE, action) =>
  state.merge({
    error: action.payload.error,
    fetching: false,
  });

export const logOut = (state = INITIAL_STATE) =>
  state.merge({
    user: null,
    fetching: false,
    error: null,
  });

export const HANDLERS = {
  [Types.LOG_IN_INIT]: logInInit,
  [Types.LOG_IN_SUCCESS]: logInSuccess,
  [Types.LOG_IN_FAILURE]: logInFailure,
  [Types.LOG_OUT]: logOut,
};

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
