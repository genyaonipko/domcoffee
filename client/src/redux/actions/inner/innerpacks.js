import {
  CHANGE_DATA_INNERPACKS,
  ADD_INNERPACK,
  SET_LOADER,
  SORT_INNERPACK_BY_MONTH,
  SORT_INNERPACK_BY_DAY,
  SORT_INNERPACK_BY_QUARTER,
  SORT_INNERPACK_BY_YEAR,
} from '../actionTypes';

import { getInnerpacks, addInnerpack } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

export const changeDataInnerpackAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: CHANGE_DATA_INNERPACKS,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const addInnerpackAction = innerpack => dispatch =>
  addInnerpack(dcRequest.addInnerpack(innerpack), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({ type: ADD_INNERPACK, payload: data.data.innerpacks });
    }
  });

export const changeDataByMonthAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_INNERPACK_BY_MONTH,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByDayAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_INNERPACK_BY_DAY,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByQuarterAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_INNERPACK_BY_QUARTER,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByYearAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_INNERPACK_BY_YEAR,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};
