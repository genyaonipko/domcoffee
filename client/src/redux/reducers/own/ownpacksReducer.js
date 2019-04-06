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
export const getOwnpackDataSuccess = (state = INITIAL_STATE, action) => {
  const ownpack = changeData(action.payload, INITIAL_STATE, 'ownpacks');
  return state.merge(ownpack);
}

export const addOwnpackDataSuccess = (state = INITIAL_STATE, action) => reduceAdded(state, INITIAL_STATE, action);

export const sortOwnpackDataByDay = (state = INITIAL_STATE, action) => {
  let ownpack = filterDataByDay(action.payload);
  ownpack = changeData(ownpack, INITIAL_STATE, 'ownpacks');
  return state.merge(ownpack);
}

export const sortOwnpackDataByMonth = (state = INITIAL_STATE, action) => {
  let ownpack = filterDataByMonth(action.payload);
  ownpack = changeData(ownpack, INITIAL_STATE, 'ownpacks');
  return state.merge(ownpack);
}

export const sortOwnpackDataByQuarter = (state = INITIAL_STATE, action) => {
  let ownpack = filterDataByQuarter(action.payload);
  ownpack = changeData(ownpack, INITIAL_STATE, 'ownpacks');
  return state.merge(ownpack);
}

export const sortOwnpackDataByYear = (state = INITIAL_STATE, action) => {
  let ownpack = filterDataByYear(action.payload);
  ownpack = changeData(ownpack, INITIAL_STATE, 'ownpacks');
  return state.merge(ownpack);
}

export const HANDLERS = {
  [Types.CHANGE_DATA_OWNPACK]: getOwnpackDataSuccess,
  [Types.ADD_OWNPACK]: addOwnpackDataSuccess,
  [Types.SORT_OWNPACK_BY_DAY]: sortOwnpackDataByDay,
  [Types.SORT_OWNPACK_BY_MONTH]: sortOwnpackDataByMonth,
  [Types.SORT_OWNPACK_BY_QUARTER]: sortOwnpackDataByQuarter,
  [Types.SORT_OWNPACK_BY_YEAR]: sortOwnpackDataByYear,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
