import { createActions } from 'reduxsauce'
import { getInnercups, addInnercup } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataInnercup: ['payload'],
  setLoader: ['payload'],
  addInnercup: ['payload'],
  sortInnercupDataByDay: ['payload'],
  sortInnercupDataByMonth: ['payload'],
  sortInnercupDataByQuarter: ['payload'],
  sortInnercupDataByYear: ['payload'],
}, {})

export const changeDataInnercupAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.changeDataInnercup(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const addInnercupAction = innercup => (dispatch, getState) => {
  const { dateTransaction } = getState().settings;
  addInnercup(
    // eslint-disable-next-line
    dcRequest.addInnercup(innercup, dateTransaction._d),
    (data, error) => {
      if (error !== undefined) {
        dispatch(console.log(error));
      } else if (data !== undefined) {
        dispatch(Creators.addInnercup(data.data.innercups));
      }
    },
  );
};

export const innercupByMonthAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortInnercupDataByMonth(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const innercupByDayAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortInnercupDataByDay(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const innercupByQuarterAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortInnercupDataByQuarter(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};

export const innercupByYearAction = () => dispatch => {
  dispatch(AdditionalActions.setLoader(true));
  getInnercups(dcRequest.getInnercups(), (data, error) => {
    if (error !== undefined) {
      dispatch(console.log(error));
    } else if (data !== undefined) {
      dispatch(Creators.sortInnercupDataByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
