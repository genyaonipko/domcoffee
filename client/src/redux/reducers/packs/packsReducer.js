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
export const getPacksDataSuccess = (state = INITIAL_STATE, action) => {
  const packs = changeData(action.payload, INITIAL_STATE, 'packs');
  return state.merge(packs);
}

export const addPacksDataSuccess = (state = INITIAL_STATE, action) =>
  state.merge(reduceAdded(state, INITIAL_STATE, action));

export const sortPacksDataByDay = (state = INITIAL_STATE, action) => {
  let packs = filterDataByDay(action.payload);
  packs = changeData(packs, INITIAL_STATE, 'packs');
  return state.merge(packs);
}

export const sortPacksDataByMonth = (state = INITIAL_STATE, action) => {
  let packs = filterDataByMonth(action.payload);
  packs = changeData(packs, INITIAL_STATE, 'packs');
  return state.merge(packs);
}

export const sortPacksDataByQuarter = (state = INITIAL_STATE, action) => {
  let packs = filterDataByQuarter(action.payload);
  packs = changeData(packs, INITIAL_STATE, 'packs');
  return state.merge(packs);
}

export const sortPacksDataByYear = (state = INITIAL_STATE, action) => {
  let packs = filterDataByYear(action.payload);
  packs = changeData(packs, INITIAL_STATE, 'packs');
  return state.merge(packs);
}

export const HANDLERS = {
  [Types.CHANGE_DATA_PACKS]: getPacksDataSuccess,
  [Types.ADD_PACKS]: addPacksDataSuccess,
  [Types.SORT_PACKS_BY_DAY]: sortPacksDataByDay,
  [Types.SORT_PACKS_BY_MONTH]: sortPacksDataByMonth,
  [Types.SORT_PACKS_BY_QUARTER]: sortPacksDataByQuarter,
  [Types.SORT_PACKS_BY_YEAR]: sortPacksDataByYear,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
