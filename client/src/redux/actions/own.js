import {
  CHANGE_DATA_OWN,
  ADD_OWN,
  SET_LOADER,
  SORT_OWN_BY_DAY,
  SORT_OWN_BY_MONTH,
  SORT_OWN_BY_QUARTER,
  SORT_OWN_BY_YEAR,
} from './actionTypes';

import { getOwn, addOwn } from '../../domCoffeeConnect';
import dcRequest from '../../domCoffeeConnect/domCoffeeConnect';

export const getAllOwnAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwn(dcRequest.getOwn(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: CHANGE_DATA_OWN,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const addOwnAction = own => dispatch =>
  addOwn(dcRequest.addSale(own), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({ type: ADD_OWN, payload: data.data.own });
    }
  });

export const changeOwnByMonthAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwn(dcRequest.getOwn(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWN_BY_MONTH,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeOwnByDayAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwn(dcRequest.getOwn(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWN_BY_DAY,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeOwnByQuarterAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwn(dcRequest.getOwn(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWN_BY_QUARTER,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeOwnByYearAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwn(dcRequest.getOwn(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWN_BY_YEAR,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};
