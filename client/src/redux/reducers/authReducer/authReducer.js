import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../../actions/actionTypes';
import isEmpty from '../../../utils/is-empty';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({
  isAuthenticated: false,
  user: {},
});

/* -------------------- Handlers ------------------  */
export const setCurrentUser = (state = INITIAL_STATE, action) =>
  state.merge({
    isAuthenticated: !isEmpty(action.payload),
    user: action.payload,
  });

export const HANDLERS = {
  [Types.SET_CURRENT_USER]: setCurrentUser,
};

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
