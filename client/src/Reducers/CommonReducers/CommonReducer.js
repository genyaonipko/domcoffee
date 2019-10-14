import moment from 'moment';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({
  sidebar: false,
  dateTransaction: moment(),
  dateFilter: null,
});

/* -------------------- Handlers ------------------  */
export const setSidebarState = (state = INITIAL_STATE, action) =>
  state.merge({ sidebar: action.payload });

export const setDateTransaction = (state = INITIAL_STATE, action) =>
  state.merge({ dateTransaction: action.payload });

export const setDateFilter = (state = INITIAL_STATE, action) =>
state.merge({ dateFilter: action.payload });

export const HANDLERS = {
  [Types.SET_SIDEBAR_STATE]: setSidebarState,
  [Types.SET_DATE_TRANSACTION]: setDateTransaction,
  [Types.SET_DATE_FILTER]: setDateFilter,
};

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
