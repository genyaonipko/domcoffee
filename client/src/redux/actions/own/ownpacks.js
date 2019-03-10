import { createActions } from 'reduxsauce'
import { getPacks, addPack } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataPacks: ['payload'],
  setLoader: ['payload'],
  addPack: ['payload'],
  sortPackDataByDay: ['payload'],
  sortPackDataByMonth: ['payload'],
  sortPackDataByQuarter: ['payload'],
  sortPackDataByYear: ['payload'],
}, {})

export const changeDataPackAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataPacks(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addPackAction = coffee => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addPack(
    dcRequest.addPack(coffee, dateTransaction),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addPack(data.data.coffee));
      }
    },
  );
};

export const coffeeByMonthAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPackDataByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const coffeeByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPackDataByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const coffeeByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPackDataByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const coffeeByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPackDataByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
