import { SET_SIDEBAR_STATE, SET_LOADER } from '../actions/actionTypes';

const initialState = {
  sidebar: true,
  isLoading: false,
};

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_STATE:
      return { ...state, sidebar: action.payload };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export default settingsReducer;
