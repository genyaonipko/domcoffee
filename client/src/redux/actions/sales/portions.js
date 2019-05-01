import { createActions } from 'reduxsauce'
import { getPortions, addPortion } from '../../../domCoffeeConnect';
import dcRequest from '../../../domCoffeeConnect/domCoffeeConnect';
import { Creators as AdditionalActions } from '../additional/additional'

const { Creators } = createActions({
  changeDataPortion: ['payload'],
  setLoader: ['payload'],
  addPortion: ['payload'],
  sortPortionByDay: ['payload'],
  sortPortionByMonth: ['payload'],
  sortPortionByQuarter: ['payload'],
  sortPortionByYear: ['payload'],
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
        dispatch(AdditionalActions.getErrors({ sales: 'Упс, что-то пошло не так 🤷‍' }));
        setTimeout(() => dispatch(AdditionalActions.getErrors({})), 3000);
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
      dispatch(Creators.sortPortionByMonth(data.data));
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
      dispatch(Creators.sortPortionByDay(data.data));
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
      dispatch(Creators.sortPortionByQuarter(data.data));
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
      dispatch(Creators.sortPortionByYear(data.data));
      dispatch(AdditionalActions.setLoader(false));
    }
  });
};
