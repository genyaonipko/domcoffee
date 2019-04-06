import { createActions } from 'reduxsauce'
import { getPortions, addPortion } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataPortion: ['payload'],
  setLoader: ['payload'],
  addPortion: ['payload'],
  sortPortionDataByDay: ['payload'],
  sortPortionDataByMonth: ['payload'],
  sortPortionDataByQuarter: ['payload'],
  sortPortionDataByYear: ['payload'],
}, {})

export const changeDataPortionAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataPortion(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addPortionAction = portion => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addPortion(
    // eslint-disable-next-line
    dcRequest.addPortion(portion, dateTransaction._d),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addPortion(data.data.portions));
      }
    },
  );
};

export const portionByMonthAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPortionDataByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const portionByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPortionDataByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const portionByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPortionDataByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const portionByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPortions(dcRequest.getPortions(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPortionDataByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
