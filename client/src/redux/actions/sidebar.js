import { SET_SIDEBAR_STATE, SET_INDEX_TAB } from '../actions/actionTypes';

export const setSidebarState = bool => ({
  type: SET_SIDEBAR_STATE,
  payload: bool,
});

export const setTabIndex = index => ({
  type: SET_INDEX_TAB,
  payload: index,
});
