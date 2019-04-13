import { createActions } from 'reduxsauce'
import { getInnerpacks, addInnerpack } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataInnerpack: ['payload'],
  setLoader: ['payload'],
  addInnerpack: ['payload'],
  sortInnerpackByDay: ['payload'],
  sortInnerpackByMonth: ['payload'],
  sortInnerpackByQuarter: ['payload'],
  sortInnerpackByYear: ['payload'],
}, {})

export const changeDataInnerpackAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataInnerpack(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addInnerpackAction = innerpack => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addInnerpack(
    // eslint-disable-next-line
    dcRequest.addInnerpack(innerpack, dateTransaction._d),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addInnerpack(data.data.innerpacks));
      }
    },
  );
};

export const innerpackByMonthAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortInnerpackByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const innerpackByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortInnerpackByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const innerpackByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortInnerpackByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const innerpackByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortInnerpackByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
