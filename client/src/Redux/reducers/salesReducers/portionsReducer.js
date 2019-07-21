import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import Types from '../../actions/actionTypes';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({
  data: [],
  selectedPortionId: '',
  fetching: false,
  error: '',
});

/* -------------------- Handlers ------------------  */
export const getPortionInit = (state = INITIAL_STATE) => {
  return state.merge({ fetching: true });
}

export const getPortionSuccess = (state = INITIAL_STATE, action) => {
  return state.merge({ ...action.payload, fetching: false });
}

export const getPortionFailure = (state = INITIAL_STATE, action) => {
  return state.merge({ ...action.payload, fetching: false });
}

export const addPortionSuccess = (state = INITIAL_STATE, action) =>
  state.merge({ data: [...state.data, action.payload.data] });

export const addPortionFailure = (state = INITIAL_STATE, action) =>
  state.merge({ error: action.payload.error });

export const HANDLERS = {
  [Types.GET_PORTION_INIT]: getPortionInit,
  [Types.GET_PORTION_SUCCESS]: getPortionSuccess,
  [Types.GET_PORTION_FAILURE]: getPortionFailure,
  [Types.ADD_PORTION_SUCCESS]: addPortionSuccess,
  [Types.ADD_PORTION_FAILURE]: addPortionFailure,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
