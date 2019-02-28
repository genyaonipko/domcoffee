import { createActions } from 'reduxsauce'
import { getDegustations, addDegustation } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

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
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataDegustations(data.data));
      dispatch(AdditionalActions.setLoader(false));
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
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationDataByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const degustationByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationDataByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const degustationByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationDataByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const degustationByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getDegustations(dcRequest.getDegustations(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortDegustationDataByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
