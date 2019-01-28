import {
  CHANGE_DATA_PACKS,
  ADD_PACKS,
  SET_LOADER,
  SORT_PACKS_BY_MONTH,
  SORT_PACKS_BY_DAY,
  SORT_PACKS_BY_QUARTER,
  SORT_PACKS_BY_YEAR,
} from '../actionTypes';

import { getPacks, addPack } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

export const changeDataPacksAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: CHANGE_DATA_PACKS,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const addPackAction = packs => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addPack(dcRequest.addPack(packs, dateTransaction), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({ type: ADD_PACKS, payload: data.data.packs });
    }
  });
};

export const changeDataByMonthAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_PACKS_BY_MONTH,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByDayAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_PACKS_BY_DAY,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByQuarterAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_PACKS_BY_QUARTER,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeDataByYearAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_PACKS_BY_YEAR,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};
