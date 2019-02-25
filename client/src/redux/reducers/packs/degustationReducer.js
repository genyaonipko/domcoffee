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
export const getDegustationDataSuccess = (state = INITIAL_STATE, action) => {
  const degustation = changeData(action.payload, INITIAL_STATE, 'degustation');
  return state.merge(degustation);
}

export const addDegustationDataSuccess = (state = INITIAL_STATE, action) => reduceAdded(state, INITIAL_STATE, action);

export const sortDegustationDataByDay = (state = INITIAL_STATE, action) => {
  let degustation = filterDataByDay(action.payload);
  degustation = changeData(degustation, INITIAL_STATE, 'degustation');
  return state.merge(degustation);
}

export const sortDegustationDataByMonth = (state = INITIAL_STATE, action) => {
  let degustation = filterDataByMonth(action.payload);
  degustation = changeData(degustation, INITIAL_STATE, 'degustation');
  return state.merge(degustation);
}

export const sortDegustationDataByQuarter = (state = INITIAL_STATE, action) => {
  let degustation = filterDataByQuarter(action.payload);
  degustation = changeData(degustation, INITIAL_STATE, 'degustation');
  return state.merge(degustation);
}

export const sortDegustationDataByYear = (state = INITIAL_STATE, action) => {
  let degustation = filterDataByYear(action.payload);
  degustation = changeData(degustation, INITIAL_STATE, 'degustation');
  return state.merge(degustation);
}

export const HANDLERS = {
  [Types.CHANGE_DATA_DEGUSTATIONS]: getDegustationDataSuccess,
  [Types.ADD_DEGUSTATION]: addDegustationDataSuccess,
  [Types.SORT_DEGUSTATION_BY_DAY]: sortDegustationDataByDay,
  [Types.SORT_DEGUSTATION_BY_MONTH]: sortDegustationDataByMonth,
  [Types.SORT_DEGUSTATION_BY_QUARTER]: sortDegustationDataByQuarter,
  [Types.SORT_DEGUSTATION_BY_YEAR]: sortDegustationDataByYear,
}


/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS)
