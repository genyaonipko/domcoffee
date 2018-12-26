import {
  SET_SIDEBAR_STATE,
  SET_LOADER,
  SET_INDEX_TAB,
} from '../actions/actionTypes';

const initialState = {
  sidebar: true,
  isLoading: false,
  tabIndex: 0,
};

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_STATE:
      return { ...state, sidebar: action.payload };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    case SET_INDEX_TAB:
      return { ...state, tabIndex: action.payload };
    default:
      return state;
  }
}

export default settingsReducer;
