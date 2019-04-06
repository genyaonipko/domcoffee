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
export const getPortionDataSuccess = (state = INITIAL_STATE, action) => {
  const portion = changeData(action.payload, INITIAL_STATE, 'portions');
  return state.merge(portion);
}

export const addPortionDataSuccess = (state = INITIAL_STATE, action) => reduceAdded(state, INITIAL_STATE, action);

export const sortPortionDataByDay = (state = INITIAL_STATE, action) => {
  let portion = filterDataByDay(action.payload);
  portion = changeData(portion, INITIAL_STATE, 'portions');
  return state.merge(portion);
}

export const sortPortionDataByMonth = (state = INITIAL_STATE, action) => {
  let portion = filterDataByMonth(action.payload);
  portion = changeData(portion, INITIAL_STATE, 'portions');
  return state.merge(portion);
}

export const sortPortionDataByQuarter = (state = INITIAL_STATE, action) => {
  let portion = filterDataByQuarter(action.payload);
  portion = changeData(portion, INITIAL_STATE, 'portions');
  return state.merge(portion);
}

export const sortPortionDataByYear = (state = INITIAL_STATE, action) => {
  let portion = filterDataByYear(action.payload);
  portion = changeData(portion, INITIAL_STATE, 'portions');
  return state.merge(portion);
}

export const HANDLERS = {
  [Types.CHANGE_DATA_PORTION]: getPortionDataSuccess,
  [Types.ADD_PORTION]: addPortionDataSuccess,
  [Types.SORT_PORTION_BY_DAY]: sortPortionDataByDay,
  [Types.SORT_PORTION_BY_MONTH]: sortPortionDataByMonth,
  [Types.SORT_PORTION_BY_QUARTER]: sortPortionDataByQuarter,
  [Types.SORT_PORTION_BY_YEAR]: sortPortionDataByYear,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
