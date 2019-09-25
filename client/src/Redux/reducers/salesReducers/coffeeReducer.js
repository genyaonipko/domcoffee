import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import Types from '../../actions/actionTypes';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({
  data: [],
  selectedCoffeeId: '',
  fetching: false,
  error: '',
});

/* -------------------- Handlers ------------------  */
export const getCoffeeInit = (state = INITIAL_STATE) => {
  return state.merge({ fetching: true });
}

export const getCoffeeSuccess = (state = INITIAL_STATE, action) => {
  return state.merge({ ...action.payload, fetching: false });
}

export const getCoffeeFailure = (state = INITIAL_STATE, action) => {
  return state.merge({ ...action.payload, fetching: false });
}

export const addCoffeeSuccess = (state = INITIAL_STATE, action) => {
  const { data: nextData, type } = action.payload;
  let normalizedArray = { ...state }.data.map(item => item.key === nextData.key ? nextData : item)
  if (type === 'add') {
    normalizedArray = normalizedArray.concat([nextData]);
  }
  return state.merge({ data: [...normalizedArray] });
}

export const addCoffeeFailure = (state = INITIAL_STATE, action) =>
  state.merge({ error: action.payload.error });

export const selectCoffeeId = (state = INITIAL_STATE, action) =>
  state.merge({ selectedCoffeeId: action.payload.id });

export const HANDLERS = {
  [Types.GET_COFFEE_INIT]: getCoffeeInit,
  [Types.GET_COFFEE_SUCCESS]: getCoffeeSuccess,
  [Types.GET_COFFEE_FAILURE]: getCoffeeFailure,
  [Types.ADD_COFFEE_SUCCESS]: addCoffeeSuccess,
  [Types.ADD_COFFEE_FAILURE]: addCoffeeFailure,
  [Types.SELECT_COFFEE_ID]: selectCoffeeId,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
