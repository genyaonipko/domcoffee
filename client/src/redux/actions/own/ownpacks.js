import { createActions } from 'reduxsauce'
import { getOwnpacks, addOwnpack } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataOwnpack: ['payload'],
  setLoader: ['payload'],
  addOwnpack: ['payload'],
  sortOwnpackDataByDay: ['payload'],
  sortOwnpackDataByMonth: ['payload'],
  sortOwnpackDataByQuarter: ['payload'],
  sortOwnpackDataByYear: ['payload'],
}, {})

export const changeDataOwnpackAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataOwnpack(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addOwnpackAction = ownpacks => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addOwnpack(
    // eslint-disable-next-line
    dcRequest.addOwnpack(ownpacks, dateTransaction._d),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addOwnpack(data.data.ownpacks));
      }
    },
  );
};

export const ownpacksByMonthAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortOwnpackDataByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const ownpacksByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortOwnpackDataByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const ownpacksByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortOwnpackDataByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const ownpacksByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getOwnpacks(dcRequest.getOwnpacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortOwnpackDataByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
