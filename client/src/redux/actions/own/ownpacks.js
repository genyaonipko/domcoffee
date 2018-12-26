import {
  CHANGE_DATA_OWNPACKS,
  ADD_OWNPACK,
  SET_LOADER,
  SORT_OWNPACK_BY_MONTH,
  SORT_OWNPACK_BY_DAY,
  SORT_OWNPACK_BY_QUARTER,
  SORT_OWNPACK_BY_YEAR,
} from '../actionTypes';

import { getOwnpacks, addOwnpack } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

export const changeDataOwnpackAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: CHANGE_DATA_OWNPACKS,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const addOwnpackAction = ownpack => dispatch =>
  addOwnpack(dcRequest.addOwnpack(ownpack), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({ type: ADD_OWNPACK, payload: data.data.ownpacks });
    }
  });

export const changeDataByMonthAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWNPACK_BY_MONTH,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByDayAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWNPACK_BY_DAY,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByQuarterAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWNPACK_BY_QUARTER,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByYearAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_OWNPACK_BY_YEAR,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};
