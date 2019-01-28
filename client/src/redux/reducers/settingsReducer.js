import moment from 'moment';
import {
  SET_SIDEBAR_STATE,
  SET_LOADER,
  SET_INDEX_TAB,
  SET_DATE_TRANSACTION,
} from '../actions/actionTypes';

const initialState = {
  sidebar: true,
  isLoading: false,
  tabIndex: 0,
  dateTransaction: moment(),
};

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_STATE:
      return { ...state, sidebar: action.payload };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    case SET_INDEX_TAB:
      return { ...state, tabIndex: action.payload };
    case SET_DATE_TRANSACTION:
      return { ...state, dateTransaction: action.payload };
    default:
      return state;
  }
}

export default settingsReducer;
