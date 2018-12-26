import {
  CHANGE_DATA_OWNCUPS,
  ADD_OWNCUP,
  SET_LOADER,
  SORT_OWNCUP_BY_MONTH,
  SORT_OWNCUP_BY_DAY,
  SORT_OWNCUP_BY_QUARTER,
  SORT_OWNCUP_BY_YEAR,
} from '../actionTypes';

import { getOwncups, addOwncup } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

export const changeDataOwncupAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: CHANGE_DATA_OWNCUPS,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const addOwncupAction = owncup => dispatch =>
  addOwncup(dcRequest.addOwncup(owncup), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({ type: ADD_OWNCUP, payload: data.data.owncups });
    }
  });

export const changeDataByMonthAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWNCUP_BY_MONTH,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByDayAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWNCUP_BY_DAY,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByQuarterAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWNCUP_BY_QUARTER,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByYearAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwncups(dcRequest.getOwncups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWNCUP_BY_YEAR,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};
