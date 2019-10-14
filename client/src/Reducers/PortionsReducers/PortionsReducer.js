import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import Types from '../actionTypes';

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

export const addPortionSuccess = (state = INITIAL_STATE, action) => {
  const { data: nextData, type } = action.payload;
  let normalizedArray = { ...state }.data.map(item => item.key === nextData.key ? nextData : item)
  if (type === 'add') {
    normalizedArray = normalizedArray.concat([nextData]);
  }
  return state.merge({ data: [...normalizedArray] });
}

export const addPortionFailure = (state = INITIAL_STATE, action) =>
  state.merge({ error: action.payload.error });

export const selectPortionId = (state = INITIAL_STATE, action) =>
  state.merge({ selectedPortionId: action.payload.id });

export const HANDLERS = {
  [Types.GET_PORTION_INIT]: getPortionInit,
  [Types.GET_PORTION_SUCCESS]: getPortionSuccess,
  [Types.GET_PORTION_FAILURE]: getPortionFailure,
  [Types.ADD_PORTION_SUCCESS]: addPortionSuccess,
  [Types.ADD_PORTION_FAILURE]: addPortionFailure,
  [Types.SELECT_PORTION_ID]: selectPortionId,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
