import {
  CHANGE_DATA_INNERCUPS,
  ADD_INNERCUP,
  SET_LOADER,
  SORT_INNERCUP_BY_MONTH,
  SORT_INNERCUP_BY_DAY,
  SORT_INNERCUP_BY_QUARTER,
  SORT_INNERCUP_BY_YEAR,
} from '../actionTypes';

import { getInnercups, addInnercup } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

export const changeDataInnercupAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: CHANGE_DATA_INNERCUPS,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const addInnercupAction = innercup => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addInnercup(
    dcRequest.addInnercup(innercup, dateTransaction),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch({ type: ADD_INNERCUP, payload: data.data.innercups });
      }
    },
  );
};

export const changeDataByMonthAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_INNERCUP_BY_MONTH,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByDayAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_INNERCUP_BY_DAY,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByQuarterAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_INNERCUP_BY_QUARTER,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByYearAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_INNERCUP_BY_YEAR,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};
