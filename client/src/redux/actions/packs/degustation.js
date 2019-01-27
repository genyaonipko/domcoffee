import {
  CHANGE_DATA_DEGUSTATIONS,
  ADD_DEGUSTATION,
  SET_LOADER,
  SORT_DEGUSTATION_BY_MONTH,
  SORT_DEGUSTATION_BY_DAY,
  SORT_DEGUSTATION_BY_QUARTER,
  SORT_DEGUSTATION_BY_YEAR,
} from '../actionTypes';

import { getDegustations, addDegustation } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

export const changeDataDegustationAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: CHANGE_DATA_DEGUSTATIONS,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const addDegustationAction = degustation => dispatch =>
  addDegustation(dcRequest.addDegustation(degustation), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({ type: ADD_DEGUSTATION, payload: data.data.degustation });
    }
  });

export const degustationByMonthAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_DEGUSTATION_BY_MONTH,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const degustationByDayAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_DEGUSTATION_BY_DAY,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const degustationByQuarterAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_DEGUSTATION_BY_QUARTER,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};

export const degustationByYearAction = () => dispatch => {
  dispatch({ type: SET_LOADER, payload: true });
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch({
        type: SORT_DEGUSTATION_BY_YEAR,
        payload: data.data,
      });
      dispatch({ type: SET_LOADER, payload: false });
    }
  });
};
