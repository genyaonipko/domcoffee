import { createActions } from 'reduxsauce';
import { getPacks, addPack } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataPacks: ['payload'],
  addPacks: ['payload'],
  sortPacksByDay: ['payload'],
  sortPacksByMonth: ['payload'],
  sortPacksByQuarter: ['payload'],
  sortPacksByYear: ['payload'],
}, {})

export const changeDataPacksAction = () => dispatch => {
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

export const addPackAction = pack => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  // eslint-disable-next-line
  addPack(dcRequest.addPack(pack, dateTransaction._d), (data, error) => {
    if (error !== undefined) {
      dispatch(AdditionalActions.getErrors({ packs: 'Упс, что-то пошло не так 🤷‍' }));
      setTimeout(() => dispatch(AdditionalActions.getErrors({})), 3000);
    } else if (data !== undefined) {
      dispatch(Creators.addPacks(data.data.packs));
    }
  });
};

export const packsByMonthAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPacksByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const packsByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPacksByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const packsByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPacksByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const packsByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getPacks(dcRequest.getPacks(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortPacksByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
