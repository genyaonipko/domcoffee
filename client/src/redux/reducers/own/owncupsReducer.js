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
export const getOwncupsDataSuccess = (state = INITIAL_STATE, action) => {
  const owncups = changeData(action.payload, INITIAL_STATE, 'owncups');
  return state.merge(owncups);
}

export const addOwncupsDataSuccess = (state = INITIAL_STATE, action) =>
  state.merge(reduceAdded(state, INITIAL_STATE, action));

export const sortOwncupsDataByDay = (state = INITIAL_STATE, action) => {
  let owncups = filterDataByDay(action.payload);
  owncups = changeData(owncups, INITIAL_STATE, 'owncups');
  return state.merge(owncups);
}

export const sortOwncupsDataByMonth = (state = INITIAL_STATE, action) => {
  let owncups = filterDataByMonth(action.payload);
  owncups = changeData(owncups, INITIAL_STATE, 'owncups');
  return state.merge(owncups);
}

export const sortOwncupsDataByQuarter = (state = INITIAL_STATE, action) => {
  let owncups = filterDataByQuarter(action.payload);
  owncups = changeData(owncups, INITIAL_STATE, 'owncups');
  return state.merge(owncups);
}

export const sortOwncupsDataByYear = (state = INITIAL_STATE, action) => {
  let owncups = filterDataByYear(action.payload);
  owncups = changeData(owncups, INITIAL_STATE, 'owncups');
  return state.merge(owncups);
}

export const HANDLERS = {
  [Types.CHANGE_DATA_OWNCUP]: getOwncupsDataSuccess,
  [Types.ADD_OWNCUP]: addOwncupsDataSuccess,
  [Types.SORT_OWNCUP_BY_DAY]: sortOwncupsDataByDay,
  [Types.SORT_OWNCUP_BY_MONTH]: sortOwncupsDataByMonth,
  [Types.SORT_OWNCUP_BY_QUARTER]: sortOwncupsDataByQuarter,
  [Types.SORT_OWNCUP_BY_YEAR]: sortOwncupsDataByYear,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
