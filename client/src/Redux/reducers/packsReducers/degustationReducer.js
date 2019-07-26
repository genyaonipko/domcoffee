import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import Types from '../../actions/actionTypes';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({
  data: [],
  selectedDegustationId: '',
  fetching: false,
  error: '',
});

/* -------------------- Handlers ------------------  */
export const getDegustationInit = (state = INITIAL_STATE) => {
  return state.merge({ fetching: true });
}

export const getDegustationSuccess = (state = INITIAL_STATE, action) => {
  return state.merge({ ...action.payload, fetching: false });
}

export const getDegustationFailure = (state = INITIAL_STATE, action) => {
  return state.merge({ ...action.payload, fetching: false });
}

export const addDegustationSuccess = (state = INITIAL_STATE, action) =>
  state.merge({ data: [...state.data, action.payload.data] });

export const addDegustationFailure = (state = INITIAL_STATE, action) =>
  state.merge({ error: action.payload.error });

export const HANDLERS = {
  [Types.GET_DEGUSTATION_INIT]: getDegustationInit,
  [Types.GET_DEGUSTATION_SUCCESS]: getDegustationSuccess,
  [Types.GET_DEGUSTATION_FAILURE]: getDegustationFailure,
  [Types.ADD_DEGUSTATION_SUCCESS]: addDegustationSuccess,
  [Types.ADD_DEGUSTATION_FAILURE]: addDegustationFailure,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
