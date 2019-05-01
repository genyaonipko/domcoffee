import { createActions } from 'reduxsauce'
import { getInnercups, addInnercup } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataInnercup: ['payload'],
  setLoader: ['payload'],
  addInnercup: ['payload'],
  sortInnercupByDay: ['payload'],
  sortInnercupByMonth: ['payload'],
  sortInnercupByQuarter: ['payload'],
  sortInnercupByYear: ['payload'],
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
        dispatch(AdditionalActions.getErrors({ inner: 'Упс, что-то пошло не так 🤷‍' }));
        setTimeout(() => dispatch(AdditionalActions.getErrors({})), 3000);
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
      dispatch(Creators.sortInnercupByMonth(data.data));
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
      dispatch(Creators.sortInnercupByDay(data.data));
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
      dispatch(Creators.sortInnercupByQuarter(data.data));
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
      dispatch(Creators.sortInnercupByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
