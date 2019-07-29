import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import Types from '../../actions/actionTypes';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({
  data: [],
  selectedPackId: '',
  fetching: false,
  error: '',
});

/* -------------------- Handlers ------------------  */
export const getPackInit = (state = INITIAL_STATE) => {
  return state.merge({ fetching: true });
}

export const getPackSuccess = (state = INITIAL_STATE, action) => {
  return state.merge({ ...action.payload, fetching: false });
}

export const getPackFailure = (state = INITIAL_STATE, action) => {
  return state.merge({ ...action.payload, fetching: false });
}

export const addPackSuccess = (state = INITIAL_STATE, action) => {
  const { data: nextData } = action.payload;
  const normalizedArray = state.data.map(item => item.key === nextData.key ? nextData : item)
  return state.merge({ data: [...normalizedArray] });
}

export const addPackFailure = (state = INITIAL_STATE, action) =>
  state.merge({ error: action.payload.error });

export const selectPackId = (state = INITIAL_STATE, action) =>
  state.merge({ selectedPackId: action.payload.id });

export const HANDLERS = {
  [Types.GET_PACK_INIT]: getPackInit,
  [Types.GET_PACK_SUCCESS]: getPackSuccess,
  [Types.GET_PACK_FAILURE]: getPackFailure,
  [Types.ADD_PACK_SUCCESS]: addPackSuccess,
  [Types.ADD_PACK_FAILURE]: addPackFailure,
  [Types.SELECT_PACK_ID]: selectPackId,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
