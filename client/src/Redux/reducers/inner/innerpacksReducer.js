import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import Types from '../../actions/actionTypes';

import {
  filterDataByDay,
  filterDataByMonth,
  filterDataByQuarter,
  filterDataByYear,
  changeData,
  reduceAdded,
} from '../../../utils/helpers';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({
  balerina: 0,
  gourme: 0,
  orient: 0,
  symphony: 0,
  servus: 0,
  sera: 0,
  rose: 0,
  opera: 0,
  barista: 0,
  nero: 0,
  italia: 0,
  marone: 0,
  pura: 0,
  verde: 0,
  cote: 0,
  trope: 0,
  java: 0,
  efiopia: 0,
  columbia: 0,
  crema: 0,
});

/* -------------------- Handlers ------------------  */
export const getInnerpackDataSuccess = (state = INITIAL_STATE, action) => {
  const innerpack = changeData(action.payload, INITIAL_STATE, 'innerpacks');
  return state.merge(innerpack);
}

export const addInnerpackDataSuccess = (state = INITIAL_STATE, action) =>
  state.merge(reduceAdded(state, INITIAL_STATE, action));

export const sortInnerpackDataByDay = (state = INITIAL_STATE, action) => {
  let innerpack = filterDataByDay(action.payload);
  innerpack = changeData(innerpack, INITIAL_STATE, 'innerpacks');
  return state.merge(innerpack);
}

export const sortInnerpackDataByMonth = (state = INITIAL_STATE, action) => {
  let innerpack = filterDataByMonth(action.payload);
  innerpack = changeData(innerpack, INITIAL_STATE, 'innerpacks');
  return state.merge(innerpack);
}

export const sortInnerpackDataByQuarter = (state = INITIAL_STATE, action) => {
  let innerpack = filterDataByQuarter(action.payload);
  innerpack = changeData(innerpack, INITIAL_STATE, 'innerpacks');
  return state.merge(innerpack);
}

export const sortInnerpackDataByYear = (state = INITIAL_STATE, action) => {
  let innerpack = filterDataByYear(action.payload);
  innerpack = changeData(innerpack, INITIAL_STATE, 'innerpacks');
  return state.merge(innerpack);
}

export const HANDLERS = {
  [Types.CHANGE_DATA_INNERPACK]: getInnerpackDataSuccess,
  [Types.ADD_INNERPACK]: addInnerpackDataSuccess,
  [Types.SORT_INNERPACK_BY_DAY]: sortInnerpackDataByDay,
  [Types.SORT_INNERPACK_BY_MONTH]: sortInnerpackDataByMonth,
  [Types.SORT_INNERPACK_BY_QUARTER]: sortInnerpackDataByQuarter,
  [Types.SORT_INNERPACK_BY_YEAR]: sortInnerpackDataByYear,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
