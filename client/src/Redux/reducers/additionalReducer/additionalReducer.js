import moment from 'moment';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../../actions/actionTypes';

/* -------------------- INITIAL_STATE ------------------  */
const INITIAL_STATE = Immutable.from({
  sidebar: false,
  isLoading: false,
  tabIndex: 0,
  dateTransaction: moment(),
  dateFilter: null,
});

/* -------------------- Handlers ------------------  */
export const setSidebarState = (state = INITIAL_STATE, action) =>
  state.merge({ sidebar: action.payload });

export const setLoader = (state = INITIAL_STATE, action) =>
  state.merge({ isLoading: action.payload });

export const setIndexTab = (state = INITIAL_STATE, action) =>
  state.merge({ tabIndex: action.payload });

export const setDateTransaction = (state = INITIAL_STATE, action) =>
  state.merge({ dateTransaction: action.payload });

export const setDateFilter = (state = INITIAL_STATE, action) =>
state.merge({ dateFilter: action.payload });

export const HANDLERS = {
  [Types.SET_SIDEBAR_STATE]: setSidebarState,
  [Types.SET_LOADER]: setLoader,
  [Types.SET_INDEX_TAB]: setIndexTab,
  [Types.SET_DATE_TRANSACTION]: setDateTransaction,
  [Types.SET_DATE_FILTER]: setDateFilter,
};

/* -------------------- Create Reducer ------------------  */
export default createReducer(INITIAL_STATE, HANDLERS);
