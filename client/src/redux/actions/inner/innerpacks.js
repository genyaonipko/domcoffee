import { createActions } from 'reduxsauce'
import { getInnerpacks, addInnerpack } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataInnerpacks: ['payload'],
  setLoader: ['payload'],
  addInnerpack: ['payload'],
  sortInnerpackDataByDay: ['payload'],
  sortInnerpackDataByMonth: ['payload'],
  sortInnerpackDataByQuarter: ['payload'],
  sortInnerpackDataByYear: ['payload'],
}, {})

export const changeDataInnerpackAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnerpacks(dcRequest.getInnerpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataInnerpacks(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addInnerpackAction = innerpack => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addInnerpack(
    dcRequest.addInnerpack(innerpack, dateTransaction),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addInnerpack(data.data.innerpack));
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
      dispatch(Creators.sortInnerpackDataByMonth(data.data));
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
      dispatch(Creators.sortInnerpackDataByDay(data.data));
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
      dispatch(Creators.sortInnerpackDataByQuarter(data.data));
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
      dispatch(Creators.sortInnerpackDataByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
