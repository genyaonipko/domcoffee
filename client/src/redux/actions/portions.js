import {
  CHANGE_DATA_PORTIONS,
  ADD_PORTION,
  SET_LOADER,
  SORT_PORTION_BY_MONTH,
  SORT_PORTION_BY_DAY,
  SORT_PORTION_BY_QUARTER,
  SORT_PORTION_BY_YEAR,
} from './actionTypes';

import { getPortions, addPortion } from '../../domCoffeeConnect';
import dcRequest from '../../domCoffeeConnect/domCoffeeConnect';

export const changePortionsAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: CHANGE_DATA_PORTIONS,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const addPortionsAction = portion => dispatch =>
  addPortion(dcRequest.addPortion(portion), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({ type: ADD_PORTION, payload: data.data.portions });
    }
  });

export const changePortionsByMonthAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_PORTION_BY_MONTH,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changePortionsByDayAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_PORTION_BY_DAY,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changePortionsByQuarterAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_PORTION_BY_QUARTER,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changePortionsByYearAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_PORTION_BY_YEAR,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};
