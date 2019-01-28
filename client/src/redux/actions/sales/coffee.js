import {
  CHANGE_DATA_COFFEE,
  ADD_COFFEE,
  SET_LOADER,
  SORT_COFFEE_BY_DAY,
  SORT_COFFEE_BY_MONTH,
  SORT_COFFEE_BY_QUARTER,
  SORT_COFFEE_BY_YEAR,
} from '../actionTypes';
import { getCoffee, addCoffee } from '../../../domCoffeeConnect/index';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

export const getAllCoffeeAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getCoffee(dcRequest.getCoffee(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: CHANGE_DATA_COFFEE,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const addCoffeeAction = coffee => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addCoffee(dcRequest.addCoffee(coffee, dateTransaction), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({ type: ADD_COFFEE, payload: data.data.coffee });
    }
  })};

export const changeCoffeeByMonthAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getCoffee(dcRequest.getCoffee(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_COFFEE_BY_MONTH,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeCoffeeByDayAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getCoffee(dcRequest.getCoffee(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_COFFEE_BY_DAY,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeCoffeeByQuarterAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getCoffee(dcRequest.getCoffee(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_COFFEE_BY_QUARTER,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const changeCoffeeByYearAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getCoffee(dcRequest.getCoffee(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_COFFEE_BY_YEAR,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};
