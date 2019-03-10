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
export const getInnercupDataSuccess = (state = INITIAL_STATE, action) => {
  const innercup = changeData(action.payload, INITIAL_STATE, 'innercup');
  return state.merge(innercup);
}

export const addInnercupDataSuccess = (state = INITIAL_STATE, action) => reduceAdded(state, INITIAL_STATE, action);

export const sortInnercupDataByDay = (state = INITIAL_STATE, action) => {
  let innercup = filterDataByDay(action.payload);
  innercup = changeData(innercup, INITIAL_STATE, 'innercup');
  return state.merge(innercup);
}

export const sortInnercupDataByMonth = (state = INITIAL_STATE, action) => {
  let innercup = filterDataByMonth(action.payload);
  innercup = changeData(innercup, INITIAL_STATE, 'innercup');
  return state.merge(innercup);
}

export const sortInnercupDataByQuarter = (state = INITIAL_STATE, action) => {
  let innercup = filterDataByQuarter(action.payload);
  innercup = changeData(innercup, INITIAL_STATE, 'innercup');
  return state.merge(innercup);
}

export const sortInnercupDataByYear = (state = INITIAL_STATE, action) => {
  let innercup = filterDataByYear(action.payload);
  innercup = changeData(innercup, INITIAL_STATE, 'innercup');
  return state.merge(innercup);
}

export const HANDLERS = {
  [Types.CHANGE_DATA_INNERCUP]: getInnercupDataSuccess,
  [Types.ADD_INNERCUP]: addInnercupDataSuccess,
  [Types.SORT_INNERCUP_BY_DAY]: sortInnercupDataByDay,
  [Types.SORT_INNERCUP_BY_MONTH]: sortInnercupDataByMonth,
  [Types.SORT_INNERCUP_BY_QUARTER]: sortInnercupDataByQuarter,
  [Types.SORT_INNERCUP_BY_YEAR]: sortInnercupDataByYear,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
