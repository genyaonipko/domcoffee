import { createActions } from 'reduxsauce';
import { getPacks, addPack } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';

const { Creators } = createActions({
  changeDataPacks: ['payload'],
  setLoader: ['payload'],
  addPacks: ['payload'],
  sortPacksByDay: ['payload'],
  sortPacksByMonth: ['payload'],
  sortPacksByQuarter: ['payload'],
  sortPacksByYear: ['payload'],
}, {})

export const changeDataPacksAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataPacks(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};

export const addPackAction = packs => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addPack(dcRequest.addPack(packs, dateTransaction), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.addPacks(data.data.packs));
    }
  });
};

export const changeDataByMonthAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPacksByMonth(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};

export const changeDataByDayAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPacksByDay(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};

export const changeDataByQuarterAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPacksByQuarter(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};

export const changeDataByYearAction = () => dispatch => {
  dispatch(Creators.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPacksByYear(data.data));
      dispatch(Creators.setLoader(false));
    }
  });
};
