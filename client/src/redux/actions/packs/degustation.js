import { createActions } from 'reduxsauce'
import { getDegustations, addDegustation } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

const { Creators } = createActions({
  changeDataDegustations: ['payload'],
  setLoader: ['payload'],
  addDegustation: ['payload'],
  sortDegustationDataByDay: ['payload'],
  sortDegustationDataByMonth: ['payload'],
  sortDegustationDataByQuarter: ['payload'],
  sortDegustationDataByYear: ['payload'],
}, {})

export const changeDataDegustationAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataDegustations(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};

export const addDegustationAction = degustation => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addDegustation(
    dcRequest.addDegustation(degustation, dateTransaction),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addDegustation(data.data.degustation));
      }
    },
  );
};

export const degustationByMonthAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationDataByMonth(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};

export const degustationByDayAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationDataByDay(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};

export const degustationByQuarterAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationDataByQuarter(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};

export const degustationByYearAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationDataByYear(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};
