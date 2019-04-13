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
export const getCoffeeDataSuccess = (state = INITIAL_STATE, action) => {
  const coffee = changeData(action.payload, INITIAL_STATE, 'coffee');
  return state.merge(coffee);
}

export const addCoffeeDataSuccess = (state = INITIAL_STATE, action) =>
  state.merge(reduceAdded(state, INITIAL_STATE, action));

export const sortCoffeeDataByDay = (state = INITIAL_STATE, action) => {
  let coffee = filterDataByDay(action.payload);
  coffee = changeData(coffee, INITIAL_STATE, 'coffee');
  return state.merge(coffee);
}

export const sortCoffeeDataByMonth = (state = INITIAL_STATE, action) => {
  let coffee = filterDataByMonth(action.payload);
  coffee = changeData(coffee, INITIAL_STATE, 'coffee');
  return state.merge(coffee);
}

export const sortCoffeeDataByQuarter = (state = INITIAL_STATE, action) => {
  let coffee = filterDataByQuarter(action.payload);
  coffee = changeData(coffee, INITIAL_STATE, 'coffee');
  return state.merge(coffee);
}

export const sortCoffeeDataByYear = (state = INITIAL_STATE, action) => {
  let coffee = filterDataByYear(action.payload);
  coffee = changeData(coffee, INITIAL_STATE, 'coffee');
  return state.merge(coffee);
}

export const HANDLERS = {
  [Types.CHANGE_DATA_COFFEE]: getCoffeeDataSuccess,
  [Types.ADD_COFFEE]: addCoffeeDataSuccess,
  [Types.SORT_COFFEE_BY_DAY]: sortCoffeeDataByDay,
  [Types.SORT_COFFEE_BY_MONTH]: sortCoffeeDataByMonth,
  [Types.SORT_COFFEE_BY_QUARTER]: sortCoffeeDataByQuarter,
  [Types.SORT_COFFEE_BY_YEAR]: sortCoffeeDataByYear,
}

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
